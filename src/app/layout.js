import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cloud Engineer Roadmap",
  description: "Roadmap lengkap menjadi Cloud Engineer - GCP, AWS, Azure, Kubernetes, dan lebih.",
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
