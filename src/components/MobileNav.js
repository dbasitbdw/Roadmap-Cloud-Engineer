"use client";
import { useState, useEffect } from "react";
import styles from "./MobileNav.module.css";

export default function MobileNav({ activeTab, setActiveTab }) {
  const [lastBelajarTab, setLastBelajarTab] = useState("google");

  const isPraktik = activeTab === "praktik";

  const handleModeChange = (mode) => {
    if (mode === "praktik") {
      setActiveTab("praktik");
    } else {
      setActiveTab(lastBelajarTab);
    }
  };

  const handleSubnavChange = (tab) => {
    setActiveTab(tab);
    setLastBelajarTab(tab);
  };

  const platforms = [
    { id: 'google', label: 'Google Cloud' },
    { id: 'aws', label: 'AWS' },
    { id: 'azure', label: 'Azure' },
    { id: 'k8s', label: 'Kubernetes' },
    { id: 'multi', label: 'Multi-Cloud' },
  ];

  return (
    <>
      {/* Subnav for platforms, only shown when Belajar is active */}
      <div className={`${styles.subnav} ${!isPraktik ? styles.visible : ''}`}>
        {platforms.map((p) => (
          <button
            key={p.id}
            className={`${styles.subnavBtn} ${activeTab === p.id ? `${styles.active} ${styles[p.id]}` : ''}`}
            onClick={() => handleSubnavChange(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Bottom Nav */}
      <div className={styles.bottomNav}>
        <button
          className={`${styles.bnavItem} ${!isPraktik ? styles.activeBelajar : ''}`}
          onClick={() => handleModeChange("belajar")}
        >
          <div className={styles.bnavIcon}>📖</div>
          <span className={styles.bnavLabel}>Belajar</span>
          <div className={styles.bnavDot}></div>
        </button>

        <button
          className={`${styles.bnavItem} ${isPraktik ? styles.activePraktik : ''}`}
          onClick={() => handleModeChange("praktik")}
        >
          <div className={styles.bnavIcon}>💻</div>
          <span className={styles.bnavLabel}>Praktik</span>
          <div className={styles.bnavDot}></div>
        </button>
      </div>
    </>
  );
}
