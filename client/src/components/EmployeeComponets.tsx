import type { EmployeeId } from 'commonTypesWithClient/branded';
import type { ShiftModel } from 'commonTypesWithClient/models';
import Link from 'next/link';
import { useEmployee } from 'src/hooks/useEmployee';
import { pagesPath } from 'src/utils/$path';
import styles from './shiftcomponents.module.css';

const HeaderLogo: React.FC = () => (
  <div className={styles.logoContainer}>
    <h1 className={styles.logo}>シフトボード</h1>
  </div>
);

const Navigation: React.FC = () => (
  <nav className={styles.nav}>
    <Link href={pagesPath.$url()} className={styles.navItem}>
      ホーム
    </Link>
  </nav>
);

const ViewOptions: React.FC = () => (
  <div className={styles.viewOptions}>
    <button className={styles.viewButton}>週表示</button>
    <button className={styles.viewButton}>月表示</button>
  </div>
);

export const Header: React.FC = () => (
  <header className={styles.header}>
    <HeaderLogo />
    <Navigation />
    <ViewOptions />
  </header>
);

type DayHeaderProps = {
  date: Date;
  day: number;
  holidays: { [key: string]: any };
  openModal: (day: string) => void;
};

const DayHeader: React.FC<DayHeaderProps> = ({ date, day, holidays, openModal }) => {
  const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
  const dayOfWeek = currentDate.getDay();
  const dateString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const isHoliday = Boolean(holidays[dateString]);
  const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;
  const isHolidayOrWeekend = isHoliday || isWeekend;
  const { weekDays } = useEmployee();
  return (
    <th
      className={isHolidayOrWeekend ? styles.holiday : ''}
      onClick={() => openModal(day.toString())}
    >
      {day} ({weekDays[dayOfWeek]})
    </th>
  );
};

type TableHeaderProps = {
  date: Date;
  daysArray: number[];
  holidays: { [key: string]: any };
  openModal: (day: string) => void;
};

export const TableHeader: React.FC<TableHeaderProps> = ({
  date,
  daysArray,
  holidays,
  openModal,
}) => {
  return (
    <thead>
      <tr>
        <th>{`${date.getFullYear()}年 ${date.getMonth() + 1}月`}</th>
        {daysArray.map((day) => (
          <DayHeader key={day} date={date} day={day} holidays={holidays} openModal={openModal} />
        ))}
      </tr>
    </thead>
  );
};

type EmployeeNameProps = {
  name: string;
};

const EmployeeName: React.FC<EmployeeNameProps> = ({ name }) => (
  <td className={styles.employeeName}>{name}</td>
);

type FixedShiftProps = {
  shift: ShiftModel;
  onDelete: () => void;
};

const FixedShift: React.FC<FixedShiftProps> = ({ shift, onDelete }) => (
  <span
    className={`${styles.redText} ${styles.clickableRedText}`}
    onClick={() => {
      if (window.confirm('この確定シフトを取り消しますか？')) {
        onDelete();
      }
    }}
  >
    {`${shift.starttime} - ${shift.endtime}`}
  </span>
);

type NormalShiftProps = {
  shift: ShiftModel;
  onCreateFixed: () => Promise<void>;
};

// NormalShiftコンポーネント
const NormalShift: React.FC<NormalShiftProps> = ({ shift, onCreateFixed }) => (
  <span
    onClick={async () => {
      await onCreateFixed();
      // 必要に応じて、シフト情報の再取得やUIの更新を行う
    }}
  >
    {`${shift.starttime} - ${shift.endtime}`}
  </span>
);

type ShiftCellProps = {
  employee: EmployeeId;
  day: number;
  shifts: ShiftModel[];
  fixedShifts: ShiftModel[];
  deleteFixedShift: (employee: EmployeeId, day: string) => void;
  createFixedShift: (
    employee: EmployeeId,
    day: string,
    startTime: string,
    endTime: string
  ) => Promise<void>;
};
const ShiftCell: React.FC<ShiftCellProps> = ({
  employee,
  day,
  shifts,
  fixedShifts,
  deleteFixedShift,
  createFixedShift,
}) => {
  const shiftForDay = shifts.find((s) => s.id === employee && s.date === day.toString());
  const fixedShiftForDay = fixedShifts.find((s) => s.id === employee && s.date === day.toString());

  if (fixedShiftForDay) {
    return (
      <FixedShift
        shift={fixedShiftForDay}
        onDelete={() => deleteFixedShift(employee, day.toString())}
      />
    );
  }

  if (shiftForDay) {
    return (
      <NormalShift
        shift={shiftForDay}
        onCreateFixed={() =>
          createFixedShift(employee, day.toString(), shiftForDay.starttime, shiftForDay.endtime)
        }
      />
    );
  }

  return null;
};

type ShiftTableBodyProps = {
  employees: EmployeeId[];
  daysArray: number[];
  shifts: ShiftModel[];
  fixedShifts: ShiftModel[];
  deleteFixedShift: (employee: EmployeeId, day: string) => void;
  createFixedShift: (
    employee: EmployeeId,
    day: string,
    startTime: string,
    endTime: string
  ) => Promise<void>;
};

export const ShiftTableBody: React.FC<ShiftTableBodyProps> = ({
  employees,
  daysArray,
  shifts,
  fixedShifts,
  deleteFixedShift,
  createFixedShift,
}) => (
  <tbody>
    {employees.map((employee) => (
      <tr key={employee}>
        <EmployeeName name={employee} />
        {daysArray.map((day) => (
          <td key={day}>
            <ShiftCell
              employee={employee}
              day={day}
              shifts={shifts}
              fixedShifts={fixedShifts}
              deleteFixedShift={deleteFixedShift}
              createFixedShift={createFixedShift}
            />
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
