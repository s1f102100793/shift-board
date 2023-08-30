import { useEffect } from 'react';
import { Header, ShiftTableBody, TableHeader } from 'src/components/EmployeeComponets';
import { ShiftTableHeader } from 'src/components/ModalComponets';
import { useEmployee } from 'src/hooks/useEmployee';
import styles from './EmployeeTask.module.css';

const EmployeeTask = () => {
  const {
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
  } = useEmployee();

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchShift();
      fetchFixedShift();
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchShift, fetchFixedShift]);

  useEffect(() => {
    fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then((res) => res.json())
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => {
        console.error('Failed to fetch holidays:', error);
      });
  }, [setHolidays]);

  return (
    <div className={styles.container}>
      <Header />
      <table className={styles.table}>
        <TableHeader date={date} daysArray={daysArray} holidays={holidays} openModal={openModal} />
        <ShiftTableBody
          employees={employees}
          daysArray={daysArray}
          shifts={shifts}
          fixedShifts={fixedShifts}
          deleteFixedShift={deleteFixedShift}
          createFixedShift={createFixedShift}
        />
      </table>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button onClick={closeModal}>閉じる</button>
            {selectedDate !== null && (
              <div>
                <h2>
                  {selectedDate}日(
                  {
                    weekDays[
                      new Date(date.getFullYear(), date.getMonth(), Number(selectedDate)).getDay()
                    ]
                  }
                  )のシフト詳細
                </h2>

                <table className={styles.timeTable}>
                  <ShiftTableHeader />
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee}>
                        <td>{employee}</td>
                        {Array.from({ length: 30 }, (_, i) => 10 + i * 0.5).map((hour) => {
                          const currentHour = Math.floor(hour);
                          const currentMinutes = hour % 1 === 0 ? 0 : 30;
                          const shiftForDay = shifts.find(
                            (shift) => shift.id === employee && shift.date === selectedDate
                          );
                          const [startHour, startMinute] = shiftForDay?.starttime
                            .split(':')
                            .map(Number) || [0, 0];
                          const [endHour, endMinute] = shiftForDay?.endtime
                            .split(':')
                            .map(Number) || [0, 0];

                          const fixedShiftForDay = fixedShifts.find(
                            (shift) => shift.id === employee && shift.date === selectedDate
                          );
                          const [fixedStartHour, fixedStartMinute] = fixedShiftForDay?.starttime
                            .split(':')
                            .map(Number) || [0, 0];
                          const [fixedEndHour, fixedEndMinute] = fixedShiftForDay?.endtime
                            .split(':')
                            .map(Number) || [0, 0];

                          const isInShiftTime =
                            (startHour < currentHour ||
                              (startHour === currentHour && startMinute <= currentMinutes)) &&
                            (endHour > currentHour ||
                              (endHour === currentHour && endMinute > currentMinutes));

                          const isInFixedShiftTime =
                            (fixedStartHour < currentHour ||
                              (fixedStartHour === currentHour &&
                                fixedStartMinute <= currentMinutes)) &&
                            (fixedEndHour > currentHour ||
                              (fixedEndHour === currentHour && fixedEndMinute > currentMinutes));

                          const isInEditingTime =
                            editingShift?.employeeId === employee &&
                            typeof editingShift?.startHour === 'string' &&
                            typeof editingShift?.endHour === 'string' &&
                            parseFloat(editingShift.startHour) <= hour &&
                            parseFloat(editingShift.endHour) > hour;

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
                              onMouseEnter={() => {
                                if (editingShift && editingShift.employeeId === employee) {
                                  if (
                                    hour >= startHour &&
                                    (hour < endHour ||
                                      (hour === endHour && currentMinutes < endMinute))
                                  ) {
                                    setEditingShift((prev) => {
                                      if (!prev) return null;

                                      return {
                                        employeeId: prev.employeeId,
                                        startHour: prev.startHour,
                                        endHour: hour.toString(),
                                      };
                                    });
                                  } else {
                                    setEditingShift(null);
                                  }
                                }
                              }}
                              onMouseUp={() => {
                                if (
                                  editingShift &&
                                  typeof editingShift.startHour === 'string' &&
                                  editingShift.startHour.trim() !== '' &&
                                  typeof editingShift.endHour === 'string' &&
                                  editingShift.endHour.trim() !== ''
                                ) {
                                  const newStartTime = formatTime(
                                    parseFloat(editingShift.startHour)
                                  );
                                  const newEndTime = formatTime(parseFloat(editingShift.endHour));

                                  createFixedShift(
                                    employee,
                                    selectedDate,
                                    newStartTime,
                                    newEndTime
                                  );
                                  setEditingShift(null);
                                }
                              }}
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
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTask;
