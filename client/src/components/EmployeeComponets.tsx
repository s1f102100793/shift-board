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
