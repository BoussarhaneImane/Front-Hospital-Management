import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18nextHttpBackend from 'i18next-http-backend';

i18n
  .use(i18nextHttpBackend) // Chargement des traductions depuis votre backend ou des fichiers locaux
  .use(LanguageDetector) // Détection de la langue de l'utilisateur
  .use(initReactI18next) // Intégration avec React
  .init({
    lng: 'fr', // Langue initiale définie sur anglais
    fallbackLng: 'fr', // Langue par défaut en cas d'échec de la détection
    debug: true, // Mode débogage, à désactiver en production
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs par défaut
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin vers vos fichiers de traduction
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

