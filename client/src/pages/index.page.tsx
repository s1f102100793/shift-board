import Link from 'next/link';
import { pagesPath } from 'src/utils/$path';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>シフトボード</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.intro}>
          <p>
            シフト管理がこれまで以上に簡単に。シフトボードであなたのスケジュールを効率的に管理しましょう。
          </p>
        </section>
        <section className={styles.actions}>
          <Link href={pagesPath.fixedcalendar.$url()} legacyBehavior>
            <a className={styles.button}>カレンダーを見る</a>
          </Link>
          <Link href={pagesPath.calendar.$url()} legacyBehavior>
            <a className={styles.button}>シフトを提出する</a>
          </Link>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2023 シフトボード. すべての権利を保持。</p>
      </footer>
    </div>
  );
};

export default Home;
