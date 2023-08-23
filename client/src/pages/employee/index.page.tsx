import type { ShiftModel } from 'commonTypesWithClient/models';
import { useEffect, useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './EmployeeTask.module.css';

const EmployeeTask = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingShift, setEditingShift] = useState<{
    employeeId: string;
    startHour: string;
    endHour?: string;
  } | null>(null);

  const [draggingShift, setDraggingShift] = useState<{
    employeeId: string;
    startHour: string;
    endHour?: string;
  } | null>(null);

  const openModal = (day: string) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [shifts, setShifts] = useState<ShiftModel[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);

  const fetchShift = async () => {
    const fetchedShifts = await apiClient.shift.$get().catch(returnNull);
    console.log(fetchedShifts);
    if (fetchedShifts !== null && fetchedShifts !== undefined) {
      setShifts(fetchedShifts);
      const uniqueEmployeeIds = [...new Set(fetchedShifts.map((shift) => shift.id))];
      setEmployees(uniqueEmployeeIds);
    }
  };

  useEffect(() => {
    fetchShift();
  }, []);

  useEffect(() => {
    fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => {
        console.error('Failed to fetch holidays:', error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{`${date.getFullYear()}年 ${date.getMonth() + 1}月`}</th>
            {daysArray.map((day) => {
              const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
              const dayOfWeek = currentDate.getDay();
              const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

              const isHoliday = Boolean(holidays[dateString]);
              const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
              const isHolidayOrWeekend = isHoliday || isWeekend;

              return (
                <th
                  key={day}
                  className={isHolidayOrWeekend ? styles.holiday : ''}
                  onClick={() => openModal(day.toString())}
                >
                  {day} ({weekDays[dayOfWeek]})
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee}>
              <td className={styles.employeeName}>{employee}</td>
              {daysArray.map((day) => {
                const shiftForDay = shifts.find(
                  (shift) => shift.id === employee && shift.date === day.toString()
                );
                return (
                  <td key={day}>
                    {shiftForDay ? `${shiftForDay.starttime} - ${shiftForDay.endtime}` : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={closeModal}>閉じる</button>
            {selectedDate !== null && (
              <div>
                <h2>
                  {selectedDate}日(
                  {
                    weekDays[
                      new Date(date.getFullYear(), date.getMonth(), Number(selectedDate)).getDay()
                    ]
                  }
                  )のシフト詳細
                </h2>

                <table className={styles.timeTable}>
                  <thead>
                    <tr>
                      <th>名前</th>
                      {/* 10時から24時までを1時間ごとに表示 */}
                      {Array.from({ length: 30 }, (_, i) => 10 + i * 0.5).map((hour) => (
                        <th key={hour}>
                          {Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee}>
                        <td>{employee}</td>
                        {Array.from({ length: 30 }, (_, i) => 10 + i * 0.5).map((hour) => {
                          const currentHour = Math.floor(hour);
                          const currentMinutes = hour % 1 === 0 ? 0 : 30;
                          const shiftForDay = shifts.find(
                            (shift) => shift.id === employee && shift.date === selectedDate
                          );
                          const [startHour, startMinute] = shiftForDay?.starttime
                            .split(':')
                            .map(Number) || [0, 0];
                          const [endHour, endMinute] = shiftForDay?.endtime
                            .split(':')
                            .map(Number) || [0, 0];

                          const isInShiftTime =
                            (startHour < currentHour ||
                              (startHour === currentHour && startMinute <= currentMinutes)) &&
                            (endHour > currentHour ||
                              (endHour === currentHour && endMinute > currentMinutes));
                          return (
                            <td
                              key={hour}
                              className={isInShiftTime ? styles.shiftTime : styles.timeCell}
                              onMouseDown={() => {
                                if (isInShiftTime) {
                                  setEditingShift({
                                    employeeId: employee,
                                    startHour: hour.toString(),
                                  });
                                }
                              }}
                              onMouseEnter={() => {
                                if (editingShift && editingShift.employeeId === employee) {
                                  setEditingShift((prev) => {
                                    if (!prev) return null;

                                    return {
                                      employeeId: prev.employeeId,
                                      startHour: prev.startHour,
                                      endHour: hour.toString(),
                                    };
                                  });
                                }
                              }}
                              onMouseUp={() => {
                                if (editingShift) {
                                  // startTimeとendTimeを更新する処理を追加する
                                  // 例: データベースやローカルのStateを更新

                                  setEditingShift(null);
                                }
                              }}
                            >
                              {/* もし編集中のセルであれば、何かしらのUIを表示 */}
                              {editingShift &&
                              editingShift.employeeId === employee &&
                              parseInt(editingShift.startHour, 10) <= hour &&
                              (typeof editingShift.endHour === 'string'
                                ? parseInt(editingShift.endHour, 10) > hour
                                : true) ? (
                                <div className={styles.editingTimeIndicator} />
                              ) : null}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTask;
