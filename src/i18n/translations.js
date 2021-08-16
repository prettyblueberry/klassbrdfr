import i18n from 'i18next';
// for auto detection language use i18next-browser-languagedetector;
//import LanguageDetector from 'i18next-browser-languagedetector';
import {en, fr, es} from ".";
 
i18n
//.use(LanguageDetector)
.init({
  // we init with resources
  resources: {
    en: {
      translations: en
    },
    fr: {
      translations: fr
    },
    es: {
      translations: es
    }
  },
  lng: 'en',
  debug: false,
  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;