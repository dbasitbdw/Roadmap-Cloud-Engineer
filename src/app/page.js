"use client";
import { useState } from "react";
import Header from "@/components/Header";
import PlatformTabs from "@/components/PlatformTabs";
import PlatformSection from "@/components/PlatformSection";
import PraktikSection from "@/components/PraktikSection";
import MobileNav from "@/components/MobileNav";
import data from "@/data.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState("google");

  return (
    <main className="page">
      <Header />
      <PlatformTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {data.platforms.map((platform) => (
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
