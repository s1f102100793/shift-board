import styles from './EmployeeTask.module.css';

const employees = ['田中太郎', '佐藤次郎', '鈴木花子', '山田一郎','aaaaaaaaa'];

const EmployeeTask = () => {
  // 現在の月を取得して、日付の配列を作成します。
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: lastDay }, (_, i) => i + 1);

  // 曜日の配列を作成します。
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>社員名</th>
            {daysArray.map((day) => (
              <th key={day}>
                {day} ({weekDays[new Date(date.getFullYear(), date.getMonth(), day).getDay()]})
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee}>
              <td>{employee}</td>
              {daysArray.map((day) => (
                <td key={day} /> // 各セルに必要な内容やスタイルを追加できます。
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTask;
