import type { ShiftModel } from 'commonTypesWithClient/models';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pagesPath } from 'src/utils/$path';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import styles from './index.module.css';

const FixedCalendar = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});
  const [shifts, setShifts] = useState<ShiftModel[]>([]);
  const [employees, setEmployees] = useState<string[]>([]);

  const fetchShift = async () => {
    const fetchedShifts = await apiClient.fixedshift.$get().catch(returnNull);
    console.log(fetchedShifts);
    if (fetchedShifts !== null && fetchedShifts !== undefined) {
      setShifts(fetchedShifts);
      const uniqueEmployeeIds = [...new Set(fetchedShifts.map((shift) => shift.id))];
      setEmployees(uniqueEmployeeIds);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchShift();
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
          <Link href={pagesPath.calendar.$url()} className={styles.navItem}>
            シフトを提出する
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
            <th>User</th>
            {daysArray.map((day) => {
              const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
              const dayOfWeek = currentDate.getDay();
              const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

              const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
              const isHoliday = Boolean(holidays[dateString]);
              const isHolidayOrWeekend = isHoliday || isWeekend;

              return (
                <th key={day} className={isHolidayOrWeekend ? styles.holidayOrWeekend : ''}>
                  {day} ({weekDays[dayOfWeek]})
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* この部分でユーザーごとのシフトを描画します。 */}
          {/* バックエンドから取得したデータを使用してユーザーをループします。 */}
          {employees.map((employeeId) => (
            <tr key={employeeId}>
              <td>{employeeId}</td>
              {daysArray.map((day) => {
                const shiftForDay = shifts.find(
                  (s) => s.id === employeeId && s.date === day.toString()
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
    </div>
  );
};

export default FixedCalendar;
