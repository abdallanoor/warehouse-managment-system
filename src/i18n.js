import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import global_en from "./translations/en/global.json";
import global_ar from "./translations/ar/global.json";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "ar",
    debug: true,

    lng: localStorage.getItem("lang") || "ar",

    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        global: global_en,
      },
      ar: {
        global: global_ar,
      },
    },
  });

export default i18n;
