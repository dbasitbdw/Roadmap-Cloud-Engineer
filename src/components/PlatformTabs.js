import styles from './PlatformTabs.module.css';

export default function PlatformTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'google', label: '☁️ Google Cloud', className: styles.tabGoogle },
    { id: 'aws', label: '🟠 AWS', className: styles.tabAws },
    { id: 'azure', label: '🔵 Microsoft Azure', className: styles.tabAzure },
    { id: 'k8s', label: '⚙️ Kubernetes', className: styles.tabK8s },
    { id: 'multi', label: '🌐 Multi-Cloud & Lainnya', className: styles.tabMulti },
    { id: 'praktik', label: '💻 Latihan Praktik', className: styles.tabPraktik },
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? `${styles.active} ${tab.className}` : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
