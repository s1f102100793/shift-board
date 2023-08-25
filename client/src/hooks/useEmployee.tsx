import type { EmployeeId } from 'commonTypesWithClient/branded';
import type { ShiftModel } from 'commonTypesWithClient/models';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';

export const useEmployee = () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const [holidays, setHolidays] = useState<{ [date: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingShift, setEditingShift] = useState<{
    employeeId: EmployeeId;
    startHour: string;
    endHour?: string;
    editingEnd?: boolean;
  } | null>(null);
  const [shifts, setShifts] = useState<ShiftModel[]>([]);
  const [fixedShifts, setFixedShifts] = useState<ShiftModel[]>([]);
  const [employees, setEmployees] = useState<EmployeeId[]>([]);

  const openModal = (day: string) => {
    setSelectedDate(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchShift = async () => {
    const fetchedShifts = await apiClient.shift.$get().catch(returnNull);
    if (fetchedShifts !== null && fetchedShifts !== undefined) {
      setShifts(fetchedShifts);
      const uniqueEmployeeIds = [...new Set(fetchedShifts.map((shift) => shift.id))];
      setEmployees(uniqueEmployeeIds);
    }
  };

  const fetchFixedShift = async () => {
    const fetchedFixedShifts = await apiClient.fixedshift.$get().catch(returnNull);
    if (fetchedFixedShifts !== null && fetchedFixedShifts !== undefined) {
      setFixedShifts(fetchedFixedShifts);
    }
  };

  const createFixedShift = async (
    employeeId: EmployeeId,
    date: string,
    newStartTime: string,
    newEndTime: string
  ) => {
    await apiClient.fixedshift.post({
      body: {
        id: employeeId,
        date,
        starttime: newStartTime,
        endtime: newEndTime,
      },
    });
  };

  const deleteFixedShift = async (employeeId: EmployeeId, date: string) => {
    await apiClient.fixedshift.delete({
      body: {
        id: employeeId,
        date,
      },
    });
  };

  const formatTime = (hourFloat: number) => {
    const hours = Math.floor(hourFloat);
    const minutes = hourFloat % 1 === 0.5 ? 30 : 0;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return {
    date,
    daysArray,
    weekDays,
    holidays,
    setHolidays,
    isModalOpen,
    selectedDate,
    editingShift,
    setEditingShift,
    shifts,
    fixedShifts,
    employees,
    openModal,
    closeModal,
    fetchShift,
    fetchFixedShift,
    createFixedShift,
    deleteFixedShift,
    formatTime,
  };
};
