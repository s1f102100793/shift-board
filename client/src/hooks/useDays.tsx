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

  const [user] = useAtom(userAtom);

  const [showShiftBar, setShowShiftBar] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);
  const [pendingShifts, setPendingShifts] = useState<string[]>([]);
  const [shifts, setShifts] = useState<string[]>([]);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());

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
  const postShiftData = async (day: number, month: number) => {
    if (!user) return;
    if (isEmptyOrNull(selectedStartTime) || isEmptyOrNull(selectedEndTime)) return;

    // YYYY-MM-DD の形式にフォーマット
    const formattedDate = `${today.year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

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
      await postShiftData(day, today.month);
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

    if (Array.isArray(getPendingShifts)) {
      const currentMonthShifts = getPendingShifts.filter((shift) => {
        const shiftDateParts = shift.date.split('-'); // YYYY-MM-DD を [YYYY, MM, DD] に分解
        const shiftYear = parseInt(shiftDateParts[0], 10);
        const shiftMonth = parseInt(shiftDateParts[1], 10) - 1; // 月は0から始まるため
        return shiftYear === currentYear && shiftMonth === currentMonth;
      });

      const getPendingShiftsDates = currentMonthShifts.map((shift) => {
        const shiftDay = shift.date.split('-')[2];
        return shiftDay;
      });

      setPendingShifts(getPendingShiftsDates);
    }
  }, [user, setPendingShifts, currentYear, currentMonth]);

  const fetchFixedShift = useCallback(async () => {
    if (!user) {
      console.error('User is null or undefined.');
      return;
    }
    const fetchedShifts = await apiClient.shift3.$post({ body: { id: user.id } }).catch(returnNull);
    const fetchedShifts_date = fetchedShifts?.map((shift) => shift.date);
    console.log(fetchedShifts_date);
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
