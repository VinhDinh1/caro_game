import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../translations/en.json";
import viTranslations from "../translations/vn.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    vi: {
      translation: viTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
