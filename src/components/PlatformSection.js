import styles from './PlatformSection.module.css';
import PhaseBlock from './PhaseBlock';

export default function PlatformSection({ platform }) {
  if (!platform || platform.id === 'praktik') return null;

  return (
    <div className={styles.section}>
      <div className={`${styles.header} ${styles[platform.id] || ''}`}>
        <div className={styles.icon}>
          {platform.id === 'google' && '☁️'}
          {platform.id === 'aws' && '🟠'}
          {platform.id === 'azure' && '🔵'}
          {platform.id === 'k8s' && '⚙️'}
          {platform.id === 'multi' && '🌐'}
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
