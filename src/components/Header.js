"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from './Header.module.css';

export default function Header() {
  const { lang, changeLang, mounted } = useLanguage();

  if (!mounted) return null;

  return (
    <header className={styles.header}>
      {/* Top Bar for Welcome Message and Language Switcher */}
      <div className={styles.topBar}>
        <div className={styles.welcomeMsg}>
          Welcome everyone 👋
        </div>
        <div className={styles.langSwitch}>
          <button 
            className={`${styles.langBtn} ${lang === 'en' ? styles.active : ''}`}
            onClick={() => changeLang('en')}
          >
            EN
          </button>
          <span className={styles.langSep}>|</span>
          <button 
            className={`${styles.langBtn} ${lang === 'id' ? styles.active : ''}`}
            onClick={() => changeLang('id')}
          >
            ID
          </button>
        </div>
      </div>

      <img src="/icon.svg" alt="Cloud Engineer Logo" className={styles.logo} />
      <span className={styles.logoCredit}>Logo © Google Cloud</span>
      <div className={styles.topTag}>CLOUD ENGINEER PATH</div>
      <h1 className={styles.title}>
        {lang === 'id' ? 'Roadmap Cloud Engineer' : 'Cloud Engineer Roadmap'}
      </h1>
      <p className={styles.sub}>
        {lang === 'id' 
          ? 'Disusun dari kurikulum Codecademy & sumber terbuka' 
          : 'Compiled from Codecademy curriculum & open sources'}
      </p>
    </header>
  );
}
