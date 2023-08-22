import { useEffect, useState } from 'react';
import styles from './EmployeeTask.module.css';

const employees = [
  '田中太郎',
  '佐藤次郎',
  '鈴木花子',
  '山田一郎',
  '木村太一',
  '高橋雅子',
  '中村翔太',
  '小林悠',
  '石田光',
  '加藤あや',
  '田中太郎',
  '佐藤次郎',
  '鈴木花子',
  '山田一郎',
  '木村太一',
  '高橋雅子',
  '中村翔太',
  '小林悠',
  '石田光',
  '加藤あや',
];

const EmployeeTask = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [editingShift, setEditingShift] = useState<{
    employeeId: string;
    startHour: number;
    endHour?: number;
  } | null>(null);

  const [draggingShift, setDraggingShift] = useState<{
    employeeId: string;
    startHour: number;
    endHour?: number;
  } | null>(null);

  const openModal = (day: number) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  type Shift = {
    id: string;
    date: number;
    startTime: string;
    endTime: string;
  };

  const shifts: Shift[] = [
    { id: '田中太郎', date: 1, startTime: '09:00', endTime: '18:00' },
    { id: '佐藤次郎', date: 1, startTime: '10:00', endTime: '19:00' },
    { id: '鈴木花子', date: 1, startTime: '11:00', endTime: '20:00' },
    { id: '山田一郎', date: 2, startTime: '09:00', endTime: '18:00' },
    { id: '木村太一', date: 2, startTime: '12:00', endTime: '21:00' },
    { id: '高橋雅子', date: 3, startTime: '09:00', endTime: '18:00' },
    { id: '中村翔太', date: 3, startTime: '10:00', endTime: '19:00' },
    { id: '小林悠', date: 4, startTime: '11:00', endTime: '20:00' },
    { id: '石田光', date: 4, startTime: '12:00', endTime: '21:00' },
    { id: '加藤あや', date: 5, startTime: '09:00', endTime: '18:00' },
    { id: '田中太郎', date: 5, startTime: '17:00', endTime: '22:30' },
    // これを続けて、適当なデータで1ヵ月分のシフトを作成できます
  ];

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
                  onClick={() => openModal(day)}
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
                  (shift) => shift.id === employee && shift.date === day
                );
                return (
                  <td key={day}>
                    {shiftForDay ? `${shiftForDay.startTime} - ${shiftForDay.endTime}` : ''}
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
                  {weekDays[new Date(date.getFullYear(), date.getMonth(), selectedDate).getDay()]}
                  )のシフト詳細
                </h2>

                <table className={styles.timeTable}>
                  <thead>
                    <tr>
                      <th>名前</th>
                      {/* 10時から24時までを1時間ごとに表示 */}
                      {Array.from({ length: 15 }, (_, i) => 10 + i).map((hour) => (
                        <th key={hour}>{hour}:00</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee}>
                        <td>{employee}</td>
                        {Array.from({ length: 15 }, (_, i) => 10 + i).map((hour) => {
                          const shiftForDay = shifts.find(
                            (shift) => shift.id === employee && shift.date === selectedDate
                          );
                          
                          const [startHour] = shiftForDay?.startTime.split(':').map(Number) || [];
                          const [endHour] = shiftForDay?.endTime.split(':').map(Number) || [];
                          const isInShiftTime = startHour <= hour && hour < endHour;

                          return (
                            <td
                              key={hour}
                              className={isInShiftTime ? styles.shiftTime : styles.timeCell}
                              onMouseDown={() => {
                                if (isInShiftTime) {
                                  setEditingShift({ employeeId: employee, startHour: hour });
                                }
                              }}
                              onMouseEnter={() => {
                                if (editingShift && editingShift.employeeId === employee) {
                                  setEditingShift((prev) => {
                                    // 確実にprevがnullでないことを確認
                                    if (!prev) return null;

                                    return {
                                      employeeId: prev.employeeId,
                                      startHour: prev.startHour,
                                      endHour: hour,
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
                              editingShift.startHour <= hour &&
                              (typeof editingShift.endHour === 'number'
                                ? editingShift.endHour > hour
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
