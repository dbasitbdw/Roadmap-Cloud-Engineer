"use client";
import { useState } from "react";
import styles from "./Footer.module.css";
import ReadmeModal from "./ReadmeModal";

export default function Footer() {
  const [showReadme, setShowReadme] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        {/* README button */}
        <button
          id="open-readme-btn"
          className={styles.readmeBtn}
          onClick={() => setShowReadme(true)}
          aria-label="Open README"
        >
          {/* Book icon */}
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 1.75C0 .784.784 0 1.75 0h3.5C6.216 0 7 .784 7 1.75V3h2V1.75C9 .784 9.784 0 10.75 0h3.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16h-3.5a1.75 1.75 0 0 1-1.75-1.75V13H7v1.25A1.75 1.75 0 0 1 5.25 16h-3.5A1.75 1.75 0 0 1 0 14.25V1.75ZM5.5 4.5H1.75a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25V4.5Zm5.5 0v9.5c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-9.5H11Zm0-1.5h3.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25V3h.25ZM1.75 1.5a.25.25 0 0 0-.25.25V3H5V1.75a.25.25 0 0 0-.25-.25H1.75Z" fill="currentColor" />
          </svg>
          README.md
        </button>

        <p>
          Built with <span className={styles.heart}>♥</span> by{' '}
          <a
            href="https://github.com/dbasitbdw"
            target="_blank"
            rel="noopener noreferrer"
          >
            @dbasitbdw
          </a>{' '}
          &copy; 2026
        </p>

      </footer>

      <ReadmeModal isOpen={showReadme} onClose={() => setShowReadme(false)} />
    </>
  );
}
