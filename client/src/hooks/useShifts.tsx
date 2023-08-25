import { apiClient } from 'src/utils/apiClient';
import { useDays } from './useDays';

export const useShifts = () => {
  const { user, selectedDays, setSelectedDays, selectedStartTime, selectedEndTime } = useDays();
  const createShift = async () => {
    if (!user) {
      console.error('User is missing or null');
      return;
    }
    if (
      selectedStartTime === null ||
      selectedStartTime === '' ||
      selectedEndTime === null ||
      selectedEndTime === ''
    ) {
      console.error('Start time or end time is missing!');
      return;
    }

    for (const day of selectedDays) {
      await apiClient.shift.post({
        body: {
          id: user.id,
          date: day.toString(), // selectedDays の各要素を date として使用
          starttime: selectedStartTime,
          endtime: selectedEndTime,
        },
      });
    }
    setSelectedDays([]);
  };
  return { createShift };
};
