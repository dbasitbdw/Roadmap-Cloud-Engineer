"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en"); // Default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("app_lang");
    if (stored) {
      setLang(stored);
    } else {
      const userLang = navigator.language || navigator.userLanguage || "";
      if (userLang.toLowerCase().includes("id")) {
        setLang("id");
        localStorage.setItem("app_lang", "id");
      } else {
        setLang("en");
        localStorage.setItem("app_lang", "en");
      }
    }
  }, []);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLang, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
