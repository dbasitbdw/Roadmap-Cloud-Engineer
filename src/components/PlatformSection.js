import styles from './PlatformSection.module.css';
import PhaseBlock from './PhaseBlock';

export default function PlatformSection({ platform }) {
  if (!platform || platform.id === 'praktik') return null;

  return (
    <div className={styles.section}>
      <div className={`${styles.header} ${styles[platform.id] || ''}`}>
        <div className={styles.icon}>
          {platform.id === 'google' && <img src="/icon.svg" alt="Google Cloud" className={styles.platformImg} />}
          {platform.id === 'aws' && <img src="/aws.png" alt="AWS" className={styles.platformImg} />}
          {platform.id === 'azure' && <img src="/azure.png" alt="Azure" className={styles.platformImg} />}
          {platform.id === 'k8s' && <img src="/kubernet.png" alt="Kubernetes" className={styles.platformImg} />}
          {platform.id === 'multi' && '☁️'}
        </div>
        <div className={styles.info}>
          <h2>{platform.title}</h2>
          <p>{platform.description}</p>
        </div>
      </div>

      <div className={styles.phases}>
        {platform.phases.map((phase, idx) => (
          <PhaseBlock key={idx} phase={phase} platformId={platform.id} />
        ))}
      </div>
    </div>
  );
}
