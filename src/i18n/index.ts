import 'intl-pluralrules';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

const resources = {
  en: {
    translation: require('./en.json'),
  },
  fr: {
    translation: require('./fr.json'),
  },
};

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
