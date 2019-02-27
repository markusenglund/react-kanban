import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationHE from '../src/assets/locals/he.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  he: {
    translation: translationHE
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "he",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;