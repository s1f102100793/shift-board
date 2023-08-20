import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './ShiftBoard.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ShiftBoard: React.FC = () => {
  const now = new Date();
  const today = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [calendarData, setCalendarData] = useState<(number | null)[]>([]);
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});

  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);

    const data = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      data.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      data.push(i);
    }

    setCalendarData(data);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    // 日本の祝日データを取得
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `https://date.nager.at/Api/v2/PublicHoliday/${selectedYear}/JP`
        );
        const holidaysOfMonth = response.data
          .filter(
            (holiday: { date: string }) => new Date(holiday.date).getMonth() === selectedMonth
          )
          .map((holiday: { date: string }) => new Date(holiday.date).getDate());

        setHolidays(holidaysOfMonth);
      } catch (error) {
        console.error('Failed to fetch holidays:', error);
      }
    };

    fetchHolidays();
  }, [selectedMonth, selectedYear]);

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

  const navigateMonth = (offset: number) => {
    let newMonth = selectedMonth + offset;
    let newYear = selectedYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  return (
    <div className={styles.container}>
      {/* Upper Half: Calendar */}
      <div className={styles.calendarSection}>
        <div className={styles.monthNavigation}>
          <button className={styles.navButton} onClick={() => navigateMonth(-1)}>
            ＜
          </button>
          <span>
            {MONTHS[selectedMonth]} {selectedYear}
          </span>
          <button className={styles.navButton} onClick={() => navigateMonth(1)}>
            ＞
          </button>
        </div>

        <div className={styles.calendarGrid}>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className={`${styles.calendarDay} ${styles.dayLabel}`}>
              {day}
            </div>
          ))}
          {calendarData.map((day, index) => {
            let dateStr = '';
            if (day !== null) {
              dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day
                .toString()
                .padStart(2, '0')}`;
            }
            const isHoliday = holidays[dateStr];
            return (
              <div
                key={index}
                className={`${styles.calendarDay} 
                          ${
                            day === today.day &&
                            selectedMonth === today.month &&
                            selectedYear === today.year
                              ? styles.today
                              : ''
                          } 
                          ${index % 7 === 0 || isHoliday ? styles.sunday : ''} 
                          ${index % 7 === 6 ? styles.saturday : ''} 
                          `}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lower Half: Shift Input */}
      <div className={styles.shiftInputSection}>{/* ... (the rest remains unchanged) */}</div>
    </div>
  );
};

export default ShiftBoard;
