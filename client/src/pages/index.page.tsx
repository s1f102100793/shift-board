import Link from 'next/link';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>シフトボード</h1>
      <Link href="/fixedcalendar" legacyBehavior>
        <button className={styles.button}>カレンダーを見る</button>
      </Link>
      <Link href="/calendar" legacyBehavior>
        <button className={styles.button}>シフトを提出する</button>
      </Link>
    </div>
  );
};

export default Home;
