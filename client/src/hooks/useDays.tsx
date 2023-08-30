import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { userAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';

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
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

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

  const isEmptyOrNull = (value: string | null): boolean => {
    return value === null || value === '';
  };

  const isValidShiftData = (): boolean => {
    if (!user) {
      console.error('User is missing or null');
      return false;
    }
    if (isEmptyOrNull(selectedStartTime) || isEmptyOrNull(selectedEndTime)) {
      console.error('Start time or end time is missing!');
      return false;
    }
    return true;
  };

  const postShiftData = async (day: number) => {
    if (!user) return;
    if (isEmptyOrNull(selectedStartTime) || isEmptyOrNull(selectedEndTime)) return;

    const formattedDate = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(
      day
    ).padStart(2, '0')}`;

    await apiClient.shift.post({
      body: {
        id: user.id,
        date: formattedDate,
        starttime: selectedStartTime as string,
        endtime: selectedEndTime as string,
      },
    });
  };

  const createShift = async () => {
    if (!isValidShiftData()) return;

    for (const day of selectedDays) {
      await postShiftData(day);
    }

    setSelectedDays([]);
  };

  const fetchShift = useCallback(async () => {
    if (!user) {
      console.error('User is null or undefined.');
      return;
    }
    const getPendingShifts = await apiClient.shift2
      .$post({ body: { id: user.id } })
      .catch(returnNull);
    const getPendingShifts_date = getPendingShifts?.map((shift) => shift.date);
    if (
      Array.isArray(getPendingShifts_date) &&
      getPendingShifts_date.every((item) => typeof item === 'string')
    ) {
      setPendingShifts(getPendingShifts_date);
    }
  }, [user, setPendingShifts]);

  // const fetchShift = useCallback(async () => {
  //   if (!user) {
  //     console.error('User is null or undefined.');
  //     return;
  //   }

  //   const getPendingShifts = await apiClient.shift2
  //     .$post({ body: { id: user.id } })
  //     .catch(returnNull);

  //   const filteredShiftDates = getPendingShifts?.filter((shift) => {
  //     const [year, month] = shift.date.split('-').map(Number);
  //     return year === selectedYear && month === selectedMonth + 1;
  //   });

  //   const shiftDays = filteredShiftDates?.map((shift) => shift.date.split('-')[2]);

  //   if (shiftDays && shiftDays.length > 0) {
  //     setPendingShifts(shiftDays);
  //   }
  // }, [user, setPendingShifts, selectedYear, selectedMonth]);

  const fetchFixedShift = useCallback(async () => {
    if (!user) {
      console.error('User is null or undefined.');
      return;
    }
    const fetchedShifts = await apiClient.shift3.$post({ body: { id: user.id } }).catch(returnNull);
    const fetchedShifts_date = fetchedShifts?.map((shift) => shift.date);
    if (
      Array.isArray(fetchedShifts_date) &&
      fetchedShifts_date.every((item) => typeof item === 'string')
    ) {
      setShifts(fetchedShifts_date);
    }
  }, [user, setShifts]);

  const handleDeleteShift = async () => {
    if (user && typeof user.id === 'string') {
      await apiClient.shift._shiftId(user.id).delete();
    } else {
      console.error('User or user ID is undefined or not a string');
    }
  };

  return {
    MONTHS,
    DAYS_OF_WEEK,
    now,
    today,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
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
  };
};
