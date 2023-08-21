// import { ActionIcon } from '@mantine/core';
// import { TimeInput } from '@mantine/dates';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import { IconClock } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
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
  const [showShiftBar, setShowShiftBar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

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

  const handleDayClick = (day: number) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const timeSlots = Array.from(new Array(24 * 2)).map(
    (_, index) =>
      `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`
  );

  const clearSelectedDays = () => {
    setSelectedDays([]);
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
                  day === today.day && selectedMonth === today.month && selectedYear === today.year
                    ? styles.today
                    : ''
                } 
                ${index % 7 === 0 || isHoliday ? styles.sunday : ''} 
                ${index % 7 === 6 ? styles.saturday : ''} 
                ${day !== null && selectedDays.includes(day) ? styles.selectedDay : ''} 
                `}
                onClick={() => {
                  if (day !== null) {
                    handleDayClick(day);
                  }
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.shiftInputSection}>
        <div className={styles.clearButtonContainer}>
          <button className={styles.clearButton} onClick={clearSelectedDays}>
            選択をクリア
          </button>
        </div>
        <div className={styles.selectedDaysSection}>
          選択された日： {selectedDays.map((day) => `${MONTHS[selectedMonth]} ${day}`).join(', ')}
        </div>
        <button className={styles.addButton} onClick={() => setShowShiftBar(true)}>
          ＋シフトを追加
        </button>
        <div className={`${styles.shiftBar} ${showShiftBar ? styles.shiftBarVisible : ''}`}>
          <div className={styles.closeButtonContainer}>
            <button onClick={() => setShowShiftBar(false)}>閉じる</button>
          </div>
          <div className="autocompleteContainer">
            <Autocomplete
              id="disabled-options-demo"
              options={timeSlots}
              getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="バイト開始時間" />}
            />
            <Autocomplete
              id="disabled-options-demo"
              options={timeSlots}
              getOptionDisabled={(option) => option === timeSlots[0] || option === timeSlots[2]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="バイト終了時間" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftBoard;
