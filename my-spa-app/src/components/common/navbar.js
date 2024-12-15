import { store } from '../../store/store.js';
import { setLanguage } from '../../store/reducers/languageReducer.js';
import { getTranslations } from '../../core/utils/language/translations.js';

export function navbar() {
  const {
    home,
    chat,
    login,
    guest,
    games
  } = getTranslations(); 

  const state = store.getState();
  const isAuthenticated = state.auth?.isAuthenticated;
  const username = state.user?.user?.username || guest; 
  const language = state.language?.language || 'en';

  window.handleLanguageChange = async function (newLanguage) {
    const selectedLanguage = String(newLanguage || '').trim();
    if (!selectedLanguage) {
      console.error('Invalid language: Language not specified or empty.');
      return;
    }
    try {
      await store.dispatch(setLanguage(selectedLanguage));
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  return `
    <nav class="navbar">
      <div class="navbar-logo">🎮 FT TRANSENDENCE</div>
      <ul class="navbar-menu">
        <li><a href="/" onclick="event.preventDefault(); navigate('/')">${home}</a></li>
        <li><a href="/chat" onclick="event.preventDefault(); navigate('/chat')">${chat}</a></li>
        <li><a href="/games" onclick="event.preventDefault(); navigate('/games')">${games}</a></li>
        ${
          isAuthenticated
            ? `<li><a href="/profile" onclick="event.preventDefault(); navigate('/profile')">${username}</a></li>`
            : `<li><a href="/login" onclick="event.preventDefault(); navigate('/login')">${login}</a></li>`
        }
        <li class="navbar-language">
          <select id="language-select" onchange="handleLanguageChange(this.value)">
            <option value="en" ${language === 'en' ? 'selected' : ''}>English</option>
            <option value="tr" ${language === 'tr' ? 'selected' : ''}>Türkçe</option>
            <option value="ru" ${language === 'ru' ? 'selected' : ''}>Русский</option>
            <option value="ar" ${language === 'ar' ? 'selected' : ''}>العربية</option>
          </select>
        </li>
      </ul>
    </nav>
  `;
}
