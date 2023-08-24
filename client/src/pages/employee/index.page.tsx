import type { EmployeeId } from 'commonTypesWithClient/branded';
import type { ShiftModel } from 'commonTypesWithClient/models';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pagesPath } from 'src/utils/$path';
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
    employeeId: EmployeeId;
    startHour: string;
    endHour?: string;
    editingEnd?: boolean;
  } | null>(null);

  const openModal = (day: string) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [shifts, setShifts] = useState<ShiftModel[]>([]);
  const [fixedShifts, setFixedShifts] = useState<ShiftModel[]>([]);
  const [employees, setEmployees] = useState<EmployeeId[]>([]);

  const fetchShift = async () => {
    const fetchedShifts = await apiClient.shift.$get().catch(returnNull);
    // console.log(fetchedShifts);
    if (fetchedShifts !== null && fetchedShifts !== undefined) {
      setShifts(fetchedShifts);
      const uniqueEmployeeIds = [...new Set(fetchedShifts.map((shift) => shift.id))];
      setEmployees(uniqueEmployeeIds);
    }
  };

  const fetchFixedShift = async () => {
    const fetchedFixedShifts = await apiClient.fixedshift.$get().catch(returnNull);
    if (fetchedFixedShifts !== null && fetchedFixedShifts !== undefined) {
      setFixedShifts(fetchedFixedShifts);
    }
  };

  const createFixedShift = async (
    employeeId: EmployeeId,
    date: string,
    newStartTime: string,
    newEndTime: string
  ) => {
    await apiClient.fixedshift.post({
      body: {
        id: employeeId,
        date,
        starttime: newStartTime,
        endtime: newEndTime,
      },
    });
  };

  const deleteFixedShift = async (employeeId: EmployeeId, date: string) => {
    // console.log(employeeId, date)
    await apiClient.fixedshift.delete({
      body: {
        id: employeeId,
        date,
      },
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchShift();
      fetchFixedShift();
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
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

  const formatTime = (hourFloat: number) => {
    const hours = Math.floor(hourFloat);
    const minutes = hourFloat % 1 === 0.5 ? 30 : 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>シフトボード</h1>
        </div>

        <nav className={styles.nav}>
          <Link href={pagesPath.$url()} className={styles.navItem}>
            ホーム
          </Link>
        </nav>

        <div className={styles.viewOptions}>
          <button className={styles.viewButton}>週表示</button>
          <button className={styles.viewButton}>月表示</button>
        </div>
      </header>
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

                const fixedShiftForDay = fixedShifts.find(
                  (shift) => shift.id === employee && shift.date === day.toString()
                );

                const displayShift = fixedShiftForDay ? (
                  <span
                    className={`${styles.redText} ${styles.clickableRedText}`}
                    onClick={() => {
                      if (window.confirm('この確定シフトを取り消しますか？')) {
                        deleteFixedShift(employee, day.toString());
                      }
                    }}
                  >
                    {`${fixedShiftForDay.starttime} - ${fixedShiftForDay.endtime}`}
                  </span>
                ) : shiftForDay ? (
                  <span
                    onClick={async () => {
                      await createFixedShift(
                        employee,
                        day.toString(),
                        shiftForDay.starttime,
                        shiftForDay.endtime
                      );
                      // 必要に応じて、シフト情報の再取得やUIの更新を行う
                    }}
                  >
                    {`${shiftForDay.starttime} - ${shiftForDay.endtime}`}
                  </span>
                ) : null;

                return <td key={day}>{displayShift}</td>;
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

                          const fixedShiftForDay = fixedShifts.find(
                            (shift) => shift.id === employee && shift.date === selectedDate
                          );
                          const [fixedStartHour, fixedStartMinute] = fixedShiftForDay?.starttime
                            .split(':')
                            .map(Number) || [0, 0];
                          const [fixedEndHour, fixedEndMinute] = fixedShiftForDay?.endtime
                            .split(':')
                            .map(Number) || [0, 0];

                          const isInShiftTime =
                            (startHour < currentHour ||
                              (startHour === currentHour && startMinute <= currentMinutes)) &&
                            (endHour > currentHour ||
                              (endHour === currentHour && endMinute > currentMinutes));

                          const isInFixedShiftTime =
                            (fixedStartHour < currentHour ||
                              (fixedStartHour === currentHour &&
                                fixedStartMinute <= currentMinutes)) &&
                            (fixedEndHour > currentHour ||
                              (fixedEndHour === currentHour && fixedEndMinute > currentMinutes));

                          const isInEditingTime =
                            editingShift?.employeeId === employee &&
                            typeof editingShift?.startHour === 'string' &&
                            typeof editingShift?.endHour === 'string' &&
                            parseFloat(editingShift.startHour) <= hour &&
                            parseFloat(editingShift.endHour) > hour;

                          return (
                            <td
                              key={hour}
                              className={
                                isInEditingTime
                                  ? styles.editingTime
                                  : isInFixedShiftTime
                                  ? styles.editingTime
                                  : isInShiftTime
                                  ? styles.shiftTime
                                  : styles.timeCell
                              }
                              onMouseDown={() => {
                                if (isInShiftTime) {
                                  setEditingShift({
                                    employeeId: employee,
                                    startHour: hour.toString(),
                                  });
                                  //     // シフトの開始時刻をクリックした場合
                                  //     if (hour === startHour) {
                                  //       setEditingShift({
                                  //         employeeId: employee,
                                  //         startHour: hour.toString(),
                                  //         editingEnd: false, // startHourを編集中であることを示す
                                  //       });
                                  //     }
                                  //     // シフトの終了時刻をクリックした場合
                                  //     else if (hour === endHour) {
                                  //       setEditingShift({
                                  //         employeeId: employee,
                                  //         startHour: startHour.toString(),
                                  //         endHour: hour.toString(),
                                  //         editingEnd: true, // endHourを編集中であることを示す
                                  //       });
                                  //     }
                                  //     // シフトの間をクリックした場合（現在の動作と同じ）
                                  //     else {
                                  //       setEditingShift({
                                  //         employeeId: employee,
                                  //         startHour: hour.toString(),
                                  //       });
                                  //     }
                                  //   }
                                  // }}
                                }
                              }}
                              onMouseEnter={() => {
                                if (editingShift && editingShift.employeeId === employee) {
                                  if (
                                    hour >= startHour &&
                                    (hour < endHour ||
                                      (hour === endHour && currentMinutes < endMinute))
                                    // // シフトの終了時刻を編集中
                                    // if (editingShift.editingEnd === true) {
                                    //   // クリックした時間が現在の開始時刻より後である場合
                                    //   if (hour >= parseInt(editingShift.startHour, 10)) {
                                    //     setEditingShift((prev) => {
                                    //       if (!prev) return null;

                                    //       return {
                                    //         ...prev,
                                    //         endHour: hour.toString(),
                                    //       };
                                    //     });
                                    //   } else {
                                    //     // シフトの範囲外にカーソルが移動した場合、編集を終了
                                    //     setEditingShift(null);
                                    //   }
                                    // }
                                    // // シフトの開始時刻を編集中

                                    // // クリックした時間が現在の終了時刻より前である場合
                                    // else if (
                                    //   typeof editingShift.endHour === 'string'
                                    //     ? hour <= parseInt(editingShift.endHour, 10)
                                    //     : true

                                    // 固定
                                  ) {
                                    setEditingShift((prev) => {
                                      if (!prev) return null;

                                      return {
                                        employeeId: prev.employeeId,
                                        startHour: prev.startHour,
                                        endHour: hour.toString(),
                                        // ...prev,
                                        // startHour: hour.toString(),
                                      };
                                    });
                                  } else {
                                    // シフトの範囲外にカーソルが移動した場合、編集を終了
                                    setEditingShift(null);
                                  }
                                }
                              }}
                              onMouseUp={() => {
                                if (
                                  editingShift &&
                                  typeof editingShift.startHour === 'string' &&
                                  editingShift.startHour.trim() !== '' &&
                                  typeof editingShift.endHour === 'string' &&
                                  editingShift.endHour.trim() !== ''
                                ) {
                                  const newStartTime = formatTime(
                                    parseFloat(editingShift.startHour)
                                  );
                                  const newEndTime = formatTime(parseFloat(editingShift.endHour));

                                  createFixedShift(
                                    employee,
                                    selectedDate,
                                    newStartTime,
                                    newEndTime
                                  );
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
