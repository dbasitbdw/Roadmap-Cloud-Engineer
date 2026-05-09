"use client";
import { useLanguage } from "@/context/LanguageContext";
import styles from './PraktikSection.module.css';

export default function PraktikSection({ platform }) {
  const { lang } = useLanguage();

  if (!platform || platform.id !== 'praktik') return null;

  return (
    <div className={styles.section}>
      <div className={styles.intro}>
        <h2>{platform.title}</h2>
        <p>{platform.description}</p>
      </div>

      <div className={styles.grid}>
        {platform.praktikGrid.map((card, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardSub}>{card.sub}</p>
            <ul className={styles.list}>
              {card.list.map((item, j) => {
                const prefixes = ['FREE', 'GCP', 'AWS', 'AZURE', 'K8S', 'PROJECT'];
                let matchedPrefix = null;
                let text = item;
                for (let p of prefixes) {
                  if (text.startsWith(p)) {
                    matchedPrefix = p;
                    text = text.substring(p.length).trim();
                    break;
                  }
                }
                return (
                  <li key={j}>
                    {matchedPrefix ? (
                      <><span className={`${styles.badge} ${styles['badge' + matchedPrefix]}`}>{matchedPrefix}</span> {text}</>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.milestone}>
        <h3 className={styles.msHeader}>{lang === 'en' ? 'Practice Milestones' : 'Milestone Latihan'}</h3>
        <div className={styles.msSteps}>
          {platform.milestones.map((ms, idx) => (
            <div key={idx} className={styles.msStep}>
              <div className={`${styles.msNum} ${styles['m' + ms.num.replace(/[^0-9]/g, '')]}`}>{ms.num}</div>
              <div className={styles.msContent}>
                <div className={styles.msTitle}>{ms.title}</div>
                <div className={styles.msDesc}>{ms.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
