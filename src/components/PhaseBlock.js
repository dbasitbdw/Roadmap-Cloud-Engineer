"use client";
import { useState } from 'react';
import styles from './PhaseBlock.module.css';
import CourseItem from './CourseItem';

export default function PhaseBlock({ phase, platformId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.block} ${isOpen ? styles.open : ''} ${styles[platformId] || ''}`}>
      <div className={styles.head} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.numBadge}>{phase.num}</div>
        <div className={styles.headInfo}>
          <div className={styles.headTitle}>{phase.title}</div>
          <div className={styles.headMeta}>{phase.meta}</div>
        </div>
        <div className={styles.tags}>
          {phase.tags.map((tag, idx) => (
            <span key={idx} className={`${styles.tag} ${styles['tag-' + tag.toLowerCase().replace(/[^a-z0-9]/g, '')]}`}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.arrow}>
          {isOpen ? '▲' : '▼'}
        </div>
      </div>
      
      {isOpen && (
        <div className={styles.body}>
          {phase.courses.map((course, idx) => (
            <CourseItem key={idx} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
