import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="Cloud Engineer Logo" className={styles.logo} />
      <span className={styles.logoCredit}>Logo © Google Cloud</span>
      <div className={styles.topTag}>CLOUD ENGINEER PATH</div>
      <h1 className={styles.title}>Roadmap Cloud Engineer</h1>
      <p className={styles.sub}>Disusun dari kurikulum Codecademy & sumber terbuka</p>
    </header>
  );
}
