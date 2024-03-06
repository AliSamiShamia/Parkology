import {getUser} from '@/data/store.data';
import {Ar} from './ar';
import {En} from './en';

export const translations = {
  ar: Ar,
  en: En,
};

type Language = 'en' | 'ar';

import {useState, useEffect} from 'react';

// Define a custom hook called useLanguage
const useTrans = () => {
  // Initialize state for language
  const [language, setLanguage] = useState<Language>('en');

  const translate = (key: keyof (typeof translations)[Language]): string => {
    return translations[language][key] || (key as string);
  };

  const init = async () => {
    const user = await getUser();
    if (user) {
      setLanguage((user.language as Language) ?? 'en');
    }
  };

  useEffect(() => {
    init();
  }, []);

  // Return the current language
  return {translate, language, setLanguage};
};

export default useTrans;
