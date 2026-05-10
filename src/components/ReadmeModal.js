"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "./ReadmeModal.module.css";

/** Lightweight markdown → HTML */
function mdToHtml(md) {
  let html = md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<pre><code class="language-${lang}">${escaped.trimEnd()}</code></pre>`;
    })
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, txt, href) => {
      // Ignore standard internal README jump links so we don't open empty windows
      if (href.endsWith("README.md") || href.endsWith("README.id.md")) return `<strong>${txt}</strong>`;
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${txt}</a>`;
    })
    .replace(/^---$/gm, "<hr />")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .split("\n");

  const blockTags = ["<h1", "<h2", "<h3", "<pre", "<hr", "<li", "<img", "<div", "<p", "<br", "</div"];
  const lines = [];
  let inList = false;

  for (let i = 0; i < html.length; i++) {
    const line = html[i].trim();
    if (!line) {
      if (inList) { lines.push("</ul>"); inList = false; }
      continue;
    }
    if (line.startsWith("<li")) {
      if (!inList) { lines.push("<ul>"); inList = true; }
      lines.push(line);
    } else {
      if (inList) { lines.push("</ul>"); inList = false; }
      const isBlock = blockTags.some(t => line.startsWith(t));
      lines.push(isBlock ? line : `<p>${line}</p>`);
    }
  }
  if (inList) lines.push("</ul>");
  return lines.join("\n");
}

const CONTENT_EN = `<div align="center">

# Cloud Engineer Roadmap

**A comprehensive, interactive guide to becoming a Cloud Engineer**

[![Live Demo](https://img.shields.io/badge/Live_Demo-roadmapcloud.vercel.app-4285F4?style=for-the-badge&logo=vercel)](https://roadmapcloud.vercel.app)

</div>

---

## 🌐 About This Project
This website is a complete interactive guide for anyone who wants to learn how to become a **Cloud Engineer**. Compiled from a trusted curriculum and open sources, this roadmap guides you step-by-step through popular cloud platforms such as **Google Cloud Platform (GCP)**, **AWS**, **Azure**, and **Kubernetes**.

This application is built using **Next.js**, supports **PWA (Progressive Web App)** functionality so it can be installed directly to your phone/desktop, and comes with automatic bilingual support (**English** & **Indonesia**).

---

## 🚀 How to Use
You can directly access and use this web app at:
👉 **[https://roadmapcloud.vercel.app](https://roadmapcloud.vercel.app)**

1. **Language Selection:** The web app will automatically detect your device's language (ID/EN). You can manually change it via the **EN | ID** button in the top right corner.
2. **Mobile Navigation:** There is a *Bottom Navigation Bar* on mobile. Click the **Learn** 📖 icon to explore the material, and **Practice** 💻 to view real-world project scenarios.
3. **Native App (PWA):** Add this website to your home screen (*Add to Home Screen*) so you can access it anytime just like a native app.

---

## 🛠️ Clone, Fork, & Modify (It's Free!)
This project is fully **OPEN SOURCE**!
You are completely **Free and Allowed** to **Clone**, **Fork**, or **Modify** it to be as awesome as you want! Feel free to add new curriculums, change the design, or use it as a template for roadmaps in other fields.

If you want to run it locally on your computer:
\`\`\`bash
# 1. Clone this repository
git clone https://github.com/dbasitbdw/Roadmap-Cloud-Engineer.git

# 2. Go into the project folder
cd Roadmap-Cloud-Engineer

# 3. Install dependencies
npm install

# 4. Run the development server
npm run dev
\`\`\`
Open \`http://localhost:3001\` in your browser!

---

## 📄 Licenses

### ⚖️ MIT License
The source code for this project is released under the **MIT License**.
You are granted full and unrestricted rights to use, copy, modify, merge, publish, and distribute this project for any purpose (personal or commercial), provided that the original copyright notice is retained.

### ☁️ Logo License (Google Cloud)
The **Google Cloud** logo used as the favicon and icon for this project is a registered trademark of **Google LLC**. Its use in this project is strictly for **educational, identification, and illustrative purposes** without any claim of official affiliation, sponsorship, or direct endorsement by Google. Please adhere to [Google's Trademark Guidelines](https://about.google/brand-resource-center/) if you plan to distribute or commercialize this logo beyond personal/educational use.

### 🎨 Logo Credits & Usage
The other Logos and Icons used in this web application (including AWS, Azure, Kubernetes, etc.) are the registered trademarks of their respective owners. They are used here solely for **educational and personal reference purposes** with appropriate credits, and not for commercial profit.
`;

const CONTENT_ID = `<div align="center">

# Roadmap Cloud Engineer

**Panduan interaktif dan komprehensif menjadi Cloud Engineer**

[![Live Demo](https://img.shields.io/badge/Live_Demo-roadmapcloud.vercel.app-4285F4?style=for-the-badge&logo=vercel)](https://roadmapcloud.vercel.app)

</div>

---

## 🌐 Tentang Web Ini
Web ini adalah panduan interaktif lengkap untuk siapa saja yang ingin belajar menjadi **Cloud Engineer**. Disusun dari kurikulum terpercaya dan berbagai sumber terbuka, roadmap ini memandu Anda langkah demi langkah di berbagai platform cloud populer seperti **Google Cloud Platform (GCP)**, **AWS**, **Azure**, hingga **Kubernetes**.

Aplikasi ini dibangun menggunakan **Next.js**, mendukung fitur **PWA (Progressive Web App)** sehingga dapat diinstall langsung ke HP/Desktop Anda, dan dilengkapi dukungan dua bahasa otomatis (**English** & **Indonesia**).

---

## 🚀 Penggunaan Web
Anda dapat langsung mengakses dan menggunakan web ini di:
👉 **[https://roadmapcloud.vercel.app](https://roadmapcloud.vercel.app)**

1. **Pilihan Bahasa:** Web akan mendeteksi bahasa perangkat Anda secara otomatis (ID/EN). Anda tetap bisa mengubahnya manual lewat tombol **EN | ID** di pojok kanan atas.
2. **Navigasi Layar HP:** Terdapat *Bottom Navigation Bar* di HP Anda. Klik ikon **Belajar** 📖 untuk mengeksplor materi, dan **Praktik** 💻 untuk melihat skenario *real-world project*.
3. **Aplikasi Native (PWA):** Tambahkan web ini ke layar utama (*Add to Home Screen*) agar bisa diakses kapanpun seperti aplikasi asli.

---

## 🛠️ Clone, Fork, & Modifikasi (Bebas!)
Proyek ini sepenuhnya **OPEN SOURCE**!
Anda sangat **Bebas dan Diperbolehkan** untuk melakukan **Clone**, **Fork**, atau **Modifikasi** sebagus dan semau Anda! Jangan ragu untuk menambahkan kurikulum baru, mengubah desain, atau menjadikannya template untuk roadmap bidang lain.

Jika ingin menjalankannya di komputer secara lokal:
\`\`\`bash
# 1. Clone repositori ini
git clone https://github.com/dbasitbdw/Roadmap-Cloud-Engineer.git

# 2. Masuk ke folder proyek
cd Roadmap-Cloud-Engineer

# 3. Install dependencies
npm install

# 4. Jalankan development server
npm run dev
\`\`\`
Buka \`http://localhost:3001\` di browser Anda!

---

## 📄 Lisensi (Licenses)

### ⚖️ MIT License
Source code proyek ini dirilis di bawah **MIT License**.
Anda diberikan hak penuh dan tanpa batasan untuk menggunakan, menyalin, mengubah, menggabungkan, menerbitkan, dan mendistribusikan proyek ini untuk keperluan apa pun (pribadi maupun komersial), dengan syarat tetap menyertakan pemberitahuan hak cipta asli.

### ☁️ Lisensi Logo (Google Cloud)
Logo **Google Cloud** yang digunakan sebagai favicon dan ikon proyek ini adalah merek dagang terdaftar milik **Google LLC**. Penggunaannya dalam proyek ini murni ditujukan untuk tujuan **edukasi, identifikasi, dan ilustrasi** tanpa klaim afiliasi resmi, sponsor, maupun dukungan langsung dari Google. Harap taati [Pedoman Merek Dagang Google](https://about.google/brand-resource-center/) apabila Anda berencana untuk mendistribusikan atau mengkomersialkan logo ini di luar penggunaan personal/edukasional.

### 🎨 Kredit & Penggunaan Logo
Logo dan Ikon lain yang digunakan dalam aplikasi web ini (termasuk AWS, Azure, Kubernetes, dll.) adalah merek dagang terdaftar dari pemiliknya masing-masing. Penggunaannya di sini murni hanya untuk **keperluan edukasi dan referensi pribadi** dengan penyertaan kredit yang sesuai, serta bukan untuk tujuan komersial.
`;

export default function ReadmeModal({ isOpen, onClose }) {
  const [activeLang, setActiveLang] = useState("en");
  const [rendered, setRendered] = useState("");

  useEffect(() => {
    const md = activeLang === "id" ? CONTENT_ID : CONTENT_EN;
    setRendered(mdToHtml(md));
  }, [activeLang]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const filename = activeLang === "id" ? "README.id.md" : "README.md";

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="README View">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Toolbar: Tabs per language + GitHub Link */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
             <div className={styles.langTabs}>
               <button 
                 className={`${styles.langTab} ${activeLang === 'en' ? styles.activeTab : ''}`}
                 onClick={() => setActiveLang('en')}
               >
                 English
               </button>
               <button 
                 className={`${styles.langTab} ${activeLang === 'id' ? styles.activeTab : ''}`}
                 onClick={() => setActiveLang('id')}
               >
                 Indonesia
               </button>
             </div>
          </div>
          <div className={styles.headerRight}>
            <a
              href="https://github.com/dbasitbdw/Roadmap-Cloud-Engineer#readme"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              <svg width="16" height="16" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"/>
              </svg>
              <span>GitHub</span>
            </a>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close Modal">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Subheader mirroring GitHub Breadcrumbs */}
        <div className={styles.fileBar}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25V1.75Z" fill="#656d76"/>
            <path d="M10.5 2.25v2.5h2.5L10.5 2.25Z" fill="#fff" opacity=".5"/>
          </svg>
          <span className={styles.filename}>{filename}</span>
          <span className={styles.fileType}>Markdown</span>
        </div>

        {/* Content */}
        <div className={styles.body} id="readme-body">
          <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: rendered }} />
        </div>
      </div>
    </div>
  );
}
