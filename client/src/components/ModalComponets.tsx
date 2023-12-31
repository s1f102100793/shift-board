import type { EmployeeId } from 'commonTypesWithClient/branded';
import type { ShiftModel } from 'commonTypesWithClient/models';
import { useEmployee } from 'src/hooks/useEmployee';
import styles from './shiftcomponents.module.css';

type ShiftModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ShiftModal: React.FC<ShiftModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button onClick={onClose}>閉じる</button>
        {children}
      </div>
    </div>
  );
};

export const ShiftTableHeader = () => (
  <thead>
    <tr>
      <th>名前</th>
      {Array.from({ length: 30 }, (_, i) => 10 + i * 0.5).map((hour) => (
        <th key={hour}>
          {Math.floor(hour)}:{hour % 1 === 0 ? '00' : '30'}
        </th>
      ))}
    </tr>
  </thead>
);

type ShiftTableRowProps = {
  employee: EmployeeId;
  selectedDate: string;
  shifts: ShiftModel[];
  fixedShifts: ShiftModel[];
};

export const ShiftTableRow: React.FC<ShiftTableRowProps> = ({
  employee,
  selectedDate,
  shifts,
  fixedShifts,
}) => (
  <tr key={employee}>
    <td>{employee}</td>
    {Array.from({ length: 30 }, (_, i) => 10 + i * 0.5).map((hour) => (
      <ShiftTimeCell
        key={hour}
        hour={hour}
        employee={employee}
        selectedDate={selectedDate}
        shifts={shifts}
        fixedShifts={fixedShifts}
      />
    ))}
  </tr>
);

const isAfterOrEqualTo = (
  currentHour: number,
  currentMinute: number,
  hour: number,
  minute: number
) => {
  return currentHour > hour || (currentHour === hour && currentMinute >= minute);
};

const isBefore = (currentHour: number, currentMinute: number, hour: number, minute: number) => {
  return currentHour < hour || (currentHour === hour && currentMinute < minute);
};

const isWithinTime = (
  currentHour: number,
  currentMinutes: number,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
) => {
  return (
    isAfterOrEqualTo(currentHour, currentMinutes, startHour, startMinute) &&
    isBefore(currentHour, currentMinutes, endHour, endMinute)
  );
};

const findShift = (shiftList: ShiftModel[], employee: string, date: string) => {
  return shiftList.find((shift) => shift.id === employee && shift.date === date);
};

const getTimeFromShift = (shift: ShiftModel | undefined) => {
  if (!shift) return [0, 0, 0, 0];
  const [startHour, startMinute] = shift.starttime.split(':').map(Number);
  const [endHour, endMinute] = shift.endtime.split(':').map(Number);
  return [startHour, startMinute, endHour, endMinute];
};

type EditingShiftType = {
  employeeId: EmployeeId;
  startHour: string;
  endHour?: string | undefined;
  editingEnd?: boolean | undefined;
};

// eslint-disable-next-line complexity
const isWithinEditingTime = (
  editingShift: EditingShiftType | null,
  employeeId: EmployeeId,
  hour: number
) => {
  return (
    editingShift?.employeeId === employeeId &&
    typeof editingShift?.startHour === 'string' &&
    typeof editingShift?.endHour === 'string' &&
    parseFloat(editingShift.startHour) <= hour &&
    parseFloat(editingShift.endHour || '0') > hour
  );
};

type ShiftTimeCellProps = {
  hour: number;
  employee: EmployeeId;
  selectedDate: string;
  shifts: ShiftModel[];
  fixedShifts: ShiftModel[];
};

// eslint-disable-next-line complexity
const ShiftTimeCell: React.FC<ShiftTimeCellProps> = ({
  hour,
  employee,
  selectedDate,
  shifts,
  fixedShifts,
}) => {
  const currentHour = Math.floor(hour);
  const currentMinutes = hour % 1 === 0 ? 0 : 30;
  const shiftForDay = findShift(shifts, employee, selectedDate);
  const [startHour, startMinute, endHour, endMinute] = getTimeFromShift(shiftForDay);
  const fixedShiftForDay = findShift(fixedShifts, employee, selectedDate);
  const [fixedStartHour, fixedStartMinute, fixedEndHour, fixedEndMinute] =
    getTimeFromShift(fixedShiftForDay);
  const isInShiftTime = isWithinTime(
    currentHour,
    currentMinutes,
    startHour,
    startMinute,
    endHour,
    endMinute
  );
  const isInFixedShiftTime = isWithinTime(
    currentHour,
    currentMinutes,
    fixedStartHour,
    fixedStartMinute,
    fixedEndHour,
    fixedEndMinute
  );
  const { editingShift, setEditingShift, formatTime, createFixedShift } = useEmployee();
  const isInEditingTime = isWithinEditingTime(editingShift, employee, hour);

  const isCurrentHourWithinShift = () => {
    return (
      hour >= startHour && (hour < endHour || (hour === endHour && currentMinutes < endMinute))
    );
  };

  const updateEditingShift = () => {
    setEditingShift((prev) => {
      if (!prev) return null;

      return {
        employeeId: prev.employeeId,
        startHour: prev.startHour,
        endHour: hour.toString(),
      };
    });
  };

  const resetEditingShift = () => {
    setEditingShift(null);
  };

  const handleMouseEnter = () => {
    if (!editingShift || editingShift.employeeId !== employee) return;

    if (isCurrentHourWithinShift()) {
      updateEditingShift();
    } else {
      resetEditingShift();
    }
  };

  const isValidEditingShift = () => {
    return !!(
      editingShift &&
      typeof editingShift.startHour === 'string' &&
      editingShift.startHour.trim() !== '' &&
      typeof editingShift.endHour === 'string' &&
      editingShift.endHour.trim() !== ''
    );
  };

  const getFormattedShiftTimes = () => {
    if (!editingShift) {
      return { newStartTime: '', newEndTime: '' };
    }
    const newStartTime = editingShift.startHour
      ? formatTime(parseFloat(editingShift.startHour))
      : '';
    const newEndTime =
      editingShift.endHour !== undefined && editingShift.endHour.trim() !== ''
        ? formatTime(parseFloat(editingShift.endHour))
        : '';

    return { newStartTime, newEndTime };
  };

  const handleMouseUp = () => {
    if (!isValidEditingShift()) return;

    const { newStartTime, newEndTime } = getFormattedShiftTimes();

    createFixedShift(employee, selectedDate, newStartTime, newEndTime);
    setEditingShift(null);
  };

  return (
    <td
      key={hour}
      className={
        isInEditingTime
          ? styles.editingTime
          : isInFixedShiftTime
          ? styles.editingTime
          : isInShiftTime
          ? styles.shiftTime
          : styles.timeCell
      }
      onMouseDown={() => {
        if (isInShiftTime) {
          setEditingShift({
            employeeId: employee,
            startHour: hour.toString(),
          });
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
    >
      {editingShift &&
      editingShift.employeeId === employee &&
      parseInt(editingShift.startHour, 10) <= hour &&
      (typeof editingShift.endHour === 'string'
        ? parseInt(editingShift.endHour, 10) > hour
        : true) ? (
        <div className={styles.editingTimeIndicator} />
      ) : null}
    </td>
  );
};
