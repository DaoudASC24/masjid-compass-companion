
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          settings: {
            title: "Settings",
            subtitle: "Customize your app experience",
            darkMode: "Dark Mode",
            language: "Language",
          },
          nav: {
            home: "Home",
            prayerTimes: "Prayer Times",
            events: "Events",
            more: "More",
          },
          languages: {
            en: "English",
            ar: "العربية",
            ur: "اردو",
            ru: "Русский",
          },
        },
      },
      ar: {
        translation: {
          settings: {
            title: "الإعدادات",
            subtitle: "تخصيص تجربة التطبيق",
            darkMode: "الوضع الداكن",
            language: "اللغة",
          },
          nav: {
            home: "الرئيسية",
            prayerTimes: "أوقات الصلاة",
            events: "الفعاليات",
            more: "المزيد",
          },
          languages: {
            en: "English",
            ar: "العربية",
            ur: "اردو",
            ru: "Русский",
          },
        },
      },
      ur: {
        translation: {
          settings: {
            title: "ترتیبات",
            subtitle: "اپنی ایپ کی تجربہ کو اپنی پسند کے مطابق بنائیں",
            darkMode: "ڈارک موڈ",
            language: "زبان",
          },
          nav: {
            home: "گھر",
            prayerTimes: "نماز کے اوقات",
            events: "تقریبات",
            more: "مزید",
          },
          languages: {
            en: "English",
            ar: "العربية",
            ur: "اردو",
            ru: "Русский",
          },
        },
      },
      ru: {
        translation: {
          settings: {
            title: "Настройки",
            subtitle: "Настройте ваше приложение",
            darkMode: "Тёмный режим",
            language: "Язык",
          },
          nav: {
            home: "Главная",
            prayerTimes: "Время молитв",
            events: "События",
            more: "Ещё",
          },
          languages: {
            en: "English",
            ar: "العربية",
            ur: "اردو",
            ru: "Русский",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
