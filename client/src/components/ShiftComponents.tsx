import { useDays } from 'src/hooks/useDays';
import styles from './shiftcomponents.module.css';

type ClearButtonContainerProps = {
  clearSelectedDays: () => void; // これは関数で何も返さないことを示しています
};

export const ClearButtonContainer: React.FC<ClearButtonContainerProps> = ({
  clearSelectedDays,
}) => (
  <div className={styles.clearButtonContainer}>
    <button className={styles.clearButton} onClick={clearSelectedDays}>
      選択をクリア
    </button>
  </div>
);

type SelectedDaysSectionProps = {
  selectedMonth: number;
  selectedDays: number[];
};

export const SelectedDaysSection: React.FC<SelectedDaysSectionProps> = ({
  selectedMonth,
  selectedDays,
}) => {
  const { MONTHS } = useDays();

  return (
    <div className={styles.selectedDaysSection}>
      選択された日： {selectedDays.map((day) => `${MONTHS[selectedMonth]} ${day}日`).join(', ')}
    </div>
  );
};

type AddButtonProps = {
  setShowShiftBar: (value: boolean) => void;
};

export const AddButton: React.FC<AddButtonProps> = ({ setShowShiftBar }) => (
  <button className={styles.addButton} onClick={() => setShowShiftBar(true)}>
    ＋シフトを追加
  </button>
);
