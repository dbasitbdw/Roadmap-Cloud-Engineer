"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from './Header.module.css';

export default function Header({ activeTab }) {
  const { lang, changeLang, mounted } = useLanguage();

  if (!mounted) return null;

  const getIconData = (tab) => {
    switch(tab) {
      case 'google': return { src: '/icon.svg', alt: 'Google Cloud Logo', credit: 'Logo © Google Cloud' };
      case 'aws': return { src: '/aws.png', alt: 'AWS Logo', credit: 'Logo © Amazon Web Services' };
      case 'azure': return { src: '/azure.png', alt: 'Azure Logo', credit: 'Logo © Microsoft Azure' };
      case 'k8s': return { src: '/kubernet.png', alt: 'Kubernetes Logo', credit: 'Logo © Cloud Native Computing Foundation' };
      case 'multi': return { emoji: '☁️', alt: 'Multi Cloud', credit: 'Multi-Cloud Architecture' };
      case 'praktik': return { emoji: '💻', alt: 'Latihan Praktik', credit: 'Hands-on Practice' };
      default: return { src: '/icon.svg', alt: 'Cloud Engineer Logo', credit: 'Logo © Google Cloud' };
    }
  };

  const iconData = getIconData(activeTab);

  return (
    <header className={styles.header}>
      {/* Top Bar for Welcome Message and Language Switcher */}
      <div className={styles.topBar}>
        <div className={styles.welcomeMsg}>
          {lang === 'id' ? 'Selamat datang semuanya 👋' : 'Welcome everyone 👋'}
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

      {iconData.src ? (
        <img src={iconData.src} alt={iconData.alt} className={styles.logo} />
      ) : (
        <div className={styles.logoEmoji}>{iconData.emoji}</div>
      )}
      <span className={styles.logoCredit}>{iconData.credit}</span>
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
