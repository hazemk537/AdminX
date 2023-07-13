// i18n.js
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  lng:'en',
 resources: {
    en: {
      translation: require('./locales/en.json')
    }
    ,ar: {
      translation: require('./locales/ar.json')
    }
  }
});

export default i18n;