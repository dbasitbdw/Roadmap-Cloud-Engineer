import styles from './CourseItem.module.css';

export default function CourseItem({ course }) {
  return (
    <div className={styles.item}>
      <div className={styles.order}>{course.order}</div>
      <div className={styles.details}>
        <div className={styles.name}>{course.name}</div>
        <div className={styles.desc}>{course.desc}</div>
        <div className={styles.badges}>
          {course.badges.map((badge, idx) => {
            const normalizedBadge = badge.toLowerCase().replace(/[^a-z0-9]/g, '');
            return (
              <span key={idx} className={`${styles.badge} ${styles['badge-' + normalizedBadge] || styles.badgeDefault}`}>
                {badge}
              </span>
            );
          })}
        </div>
      </div>
      {course.duration && (
        <div className={styles.duration}>{course.duration}</div>
      )}
    </div>
  );
}
