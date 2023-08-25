import { Autocomplete, TextField } from '@mui/material';
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

type CloseButtonProps = {
  onClose: () => void;
};

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => (
  <div className={styles.closeButtonContainer}>
    <button className={styles.clearButton} onClick={onClose}>
      閉じる
    </button>
  </div>
);

type AutoCompleteFieldProps = {
  label: string;
  id: string;
  options: string[]; // 仮にstring型としています
  onChange: (value: string | null) => void; // 仮にstring型としています
};

export const AutoCompleteField: React.FC<AutoCompleteFieldProps> = ({
  label,
  id,
  options,
  onChange,
}) => (
  <div className={styles.timespace}>
    <Autocomplete
      id={id}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(event, newValue) => onChange(newValue)}
    />
  </div>
);

type ShiftButtonsProps = {
  onCreateShift: () => void;
  onDeleteShift: () => void;
};

export const ShiftButtons: React.FC<ShiftButtonsProps> = ({ onCreateShift, onDeleteShift }) => (
  <div className={styles.timespace}>
    <button className={styles.shiftsubmitbutton} onClick={onCreateShift}>
      シフトを送る
    </button>
    <button className={styles.deleteShiftButton} onClick={onDeleteShift}>
      シフトを消す
    </button>
  </div>
);
