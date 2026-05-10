import styles from './PlatformTabs.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function PlatformTabs({ activeTab, setActiveTab }) {
  const { lang, mounted } = useLanguage();

  if (!mounted) return null;

  const tabs = [
    { id: 'google', label: 'Google Cloud', icon: '/icon.svg', className: styles.tabGoogle },
    { id: 'aws', label: 'AWS', icon: '/aws.png', className: styles.tabAws },
    { id: 'azure', label: 'Microsoft Azure', icon: '/azure.png', className: styles.tabAzure },
    { id: 'k8s', label: 'Kubernetes', icon: '/kubernet.png', className: styles.tabK8s },
    { id: 'multi', label: lang === 'id' ? 'Multi-Cloud & Lainnya' : 'Multi-Cloud & Others', emoji: '☁️', className: styles.tabMulti },
    { id: 'praktik', label: lang === 'id' ? 'Latihan Praktik' : 'Hands-on Practice', emoji: '💻', className: styles.tabPraktik },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? `${styles.active} ${tab.className}` : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon ? (
            <img src={tab.icon} alt={tab.label} className={styles.tabIcon} />
          ) : (
            <span className={styles.tabEmoji}>{tab.emoji}</span>
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
