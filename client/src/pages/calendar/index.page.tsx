import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  AddButton,
  ClearButtonContainer,
  SelectedDaysSection,
} from 'src/components/ShiftComponents';
import { useDays } from 'src/hooks/useDays';
import { pagesPath } from 'src/utils/$path';
import styles from './ShiftBoard.module.css';

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number) {
  return new Date(year, month, 1).getDay();
}

const ShiftBoard: React.FC = () => {
  const {
    MONTHS,
    DAYS_OF_WEEK,
    now,
    today,
    showShiftBar,
    setShowShiftBar,
    selectedDays,
    setSelectedStartTime,
    setSelectedEndTime,
    pendingShifts,
    shifts,
    handleDayClick,
    startTimeSlots,
    endTimeSlots,
    clearSelectedDays,
    createShift,
    fetchShift,
    fetchFixedShift,
    handleDeleteShift,
  } = useDays();

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
    fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => {
        console.error('Failed to fetch holidays:', error);
      });
  }, []);

  // 1
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

  useEffect(() => {
    fetchShift();
    fetchFixedShift();
    const intervalId = setInterval(fetchShift, 100);
    const intervalNewId = setInterval(fetchFixedShift, 100);
    return () => {
      clearInterval(intervalId);
      clearInterval(intervalNewId);
    };
  }, [fetchShift, fetchFixedShift]);

  const getDateStr = (day: number | null): string => {
    if (day === null) return '';
    return `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
  };

  // eslint-disable-next-line complexity
  const getDayClassNames = (day: number | null, index: number): string => {
    const dateStr = getDateStr(day);
    const isHoliday = holidays[dateStr];
    const isPendingShift = day !== null ? pendingShifts.includes(day.toString()) : false;
    const isFixedShift = day !== null ? shifts.includes(day?.toString()) : false;

    return `${styles.calendarDay} 
      ${
        day === today.day && selectedMonth === today.month && selectedYear === today.year
          ? styles.today
          : ''
      } 
      ${index % 7 === 0 || isHoliday ? styles.sunday : ''} 
      ${index % 7 === 6 ? styles.saturday : ''} 
      ${day !== null && selectedDays.includes(day) ? styles.selectedDay : ''} 
      ${isPendingShift ? styles.pendingShiftDay : ''}
      ${isFixedShift ? styles.fixedShiftDay : ''}`;
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
          <Link href={pagesPath.fixedcalendar.$url()} className={styles.navItem}>
            カレンダー
          </Link>
        </nav>
      </header>
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
            return (
              <div
                key={index}
                className={getDayClassNames(day, index)}
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
        <ClearButtonContainer clearSelectedDays={clearSelectedDays} />
        <SelectedDaysSection selectedMonth={selectedMonth} selectedDays={selectedDays} />
        <AddButton setShowShiftBar={setShowShiftBar} />
        <div className={`${styles.shiftBar} ${showShiftBar ? styles.shiftBarVisible : ''}`}>
          <div className={styles.closeButtonContainer}>
            <button className={styles.clearButton} onClick={() => setShowShiftBar(false)}>
              閉じる
            </button>
          </div>
          <div className="autocompleteContainer">
            <div className={styles.timespace}>
              <Autocomplete
                id="disabled-options-demo"
                options={startTimeSlots}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="バイト開始時間" />}
                onChange={(event, newValue) => setSelectedStartTime(newValue)}
              />
            </div>
            <div className={styles.timespace}>
              <Autocomplete
                id="disabled-options-demo"
                options={endTimeSlots}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="バイト終了時間" />}
                onChange={(event, newValue) => setSelectedEndTime(newValue)}
              />
            </div>
            <div className={styles.timespace}>
              <button className={styles.shiftsubmitnutton} onClick={createShift}>
                シフトを送る
              </button>
              <button className={styles.deleteShiftButton} onClick={handleDeleteShift}>
                シフトを消す
              </button>
              {/* <button className="save-to-database-btn" onClick={fetchShift}>
                シフトとってくる
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftBoard;
