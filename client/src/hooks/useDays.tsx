import { useAtom } from 'jotai';
import { useState } from 'react';
import { userAtom } from 'src/atoms/user';

export const useDays = () => {
  const MONTHS = [
    '1月', // January
    '2月', // February
    '3月', // March
    '4月', // April
    '5月', // May
    '6月', // June
    '7月', // July
    '8月', // August
    '9月', // September
    '10月', // October
    '11月', // November
    '12月', // December
  ];

  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const now = new Date();

  const today = { day: now.getDate(), month: now.getMonth(), year: now.getFullYear() };

  const [user] = useAtom(userAtom);

  const [showShiftBar, setShowShiftBar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [pendingShifts, setPendingShifts] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);

  const handleDayClick = (day: number) => {
    setSelectedDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const startTimeSlots: string[] = [];
  for (let i = 10; i <= 19; i++) {
    startTimeSlots.push(`${i}:00`);
    if (i !== 19) {
      startTimeSlots.push(`${i}:30`);
    }
  }

  const endTimeSlots: string[] = [];
  for (let i = 11; i <= 23; i++) {
    endTimeSlots.push(`${i}:00`);
    if (i !== 19) {
      endTimeSlots.push(`${i}:30`);
    }
  }

  const clearSelectedDays = () => {
    setSelectedDays([]);
  };

  return {
    MONTHS,
    DAYS_OF_WEEK,
    now,
    today,
    user,
    showShiftBar,
    setShowShiftBar,
    selectedDays,
    setSelectedDays,
    selectedStartTime,
    setSelectedStartTime,
    selectedEndTime,
    setSelectedEndTime,
    pendingShifts,
    setPendingShifts,
    shifts,
    setShifts,
    handleDayClick,
    startTimeSlots,
    endTimeSlots,
    clearSelectedDays,
  };
};
