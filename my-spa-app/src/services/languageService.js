const languageService = {
    async getLanguage(language) {
      const lang = String(language || '').trim();
      if (!lang) {
        throw new Error('Dil parametresi boş veya tanımlı değil.');
      }
      const response = await fetch(`/src/languages/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Dil dosyası bulunamadı: ${lang}`);
      }
      const translations = await response.json();
      return { language: lang, translations };
    },
  };
  
  export const { getLanguage } = languageService;
  