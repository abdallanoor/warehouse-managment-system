import { createContext, useContext, useEffect, useState } from "react";
import i18n from "i18next";

const initialState = {
  lang: "ar",
  setLang: () => null,
};

const LanguageProviderContext = createContext(initialState);

export function LanguageProvider({
  children,
  defaultLang = "ar",
  storageKey = "lang",
  ...props
}) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(storageKey) || defaultLang;
  });

  useEffect(() => {
    const root = document.documentElement;
    const direction = lang === "ar" ? "rtl" : "ltr";
    root.setAttribute("dir", direction);
    root.setAttribute("lang", lang);
    localStorage.setItem(storageKey, lang);
    i18n.changeLanguage(lang);
    i18n.dir(direction);
  }, [lang, storageKey]);

  const value = {
    lang,
    setLang: (lang) => {
      localStorage.setItem(storageKey, lang);
      setLang(lang);
    },
  };

  return (
    <LanguageProviderContext.Provider value={value} {...props}>
      {children}
    </LanguageProviderContext.Provider>
  );
}
export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
