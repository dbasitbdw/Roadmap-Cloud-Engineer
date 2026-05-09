"use client";
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Built with <span className={styles.heart}>♥</span> by{' '}
        <a 
          href="https://github.com/dbasitbdw" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          @dbasitbdw
        </a> &copy; 2026
      </p>
    </footer>
  );
}
