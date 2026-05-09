"use client";
import { useState } from "react";
import Header from "@/components/Header";
import PlatformTabs from "@/components/PlatformTabs";
import PlatformSection from "@/components/PlatformSection";
import PraktikSection from "@/components/PraktikSection";
import MobileNav from "@/components/MobileNav";
import { useLanguage } from "@/context/LanguageContext";
import data from "@/data.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState("google");
  const { lang, mounted } = useLanguage();

  if (!mounted) return null; // Prevent hydration mismatch

  const platformsData = data[lang]?.platforms || data.en.platforms;

  return (
    <main className="page">
      <Header />
      <PlatformTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {platformsData.map((platform) => (
        <div key={platform.id} style={{ display: activeTab === platform.id ? 'block' : 'none' }}>
          {platform.id === 'praktik' ? (
            <PraktikSection platform={platform} />
          ) : (
            <PlatformSection platform={platform} />
          )}
        </div>
      ))}

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
