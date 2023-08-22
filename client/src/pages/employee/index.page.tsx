import { useEffect, useState } from 'react';
import styles from './EmployeeTask.module.css';

const employees = ['田中太郎', '佐藤次郎', '鈴木花子', '山田一郎', 'aaaaaaaaa'];

const EmployeeTask = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});

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
            <th>社員名</th>
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
                <th key={day} className={isHolidayOrWeekend ? styles.holiday : ''}>
                  {day} ({weekDays[dayOfWeek]})
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee}>
              <td>{employee}</td>
              {daysArray.map((day) => (
                <td key={day} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTask;
