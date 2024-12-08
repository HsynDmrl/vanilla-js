import { store } from '../store/store.js';
import { setLanguage } from '../store/reducers/languageReducer.js';

export function navbar() {
  const state = store.getState(); // Mevcut durumu al
  const isAuthenticated = state.auth?.isAuthenticated;
  const username = state.user?.user?.username || 'Guest';
  const language = state.language?.language || 'en';
  const translations = state.language?.translations || {};

  // Dil değiştirme işlevi
  window.handleLanguageChange = async function (newLanguage) {
    console.log('Fonksiyon çağrıldı, newLanguage:', newLanguage);

    const language = String(newLanguage || '').trim();

    if (!language) {
      console.error('Geçersiz dil: Dil tanımlı değil veya boş.');
      return;
    }

    console.log(`Dil değiştiriliyor: ${language}`);

    try {
      await store.dispatch(setLanguage(language));
      const updatedState = store.getState();
      console.log('Dil dosyası yüklendi:', updatedState.language.language);
    } catch (error) {
      console.error('Dil yükleme hatası:', error);
    }
  };

  const home = translations['home'] || 'Home';
  const about = translations['about'] || 'About';
  const login = translations['login'] || 'Login';

  return `
    <nav>
      <ul>
        <li><a href="/" onclick="event.preventDefault(); navigate('/')">${home}</a></li>
        <li><a href="/about" onclick="event.preventDefault(); navigate('/about')"> ${about}</a></li>
        ${
          isAuthenticated
            ? `<li><a href="/profile" onclick="event.preventDefault(); navigate('/profile')">${username}</a></li>` // Kullanıcı adı
            : `<li><a href="/login" onclick="event.preventDefault(); navigate('/login')"> ${login}</a></li>` // Giriş
        }
        <li>
          <select id="language-select" onchange="handleLanguageChange(this.value)">
            <option value="en" ${language === 'en' ? 'selected' : ''}>EN</option>
            <option value="tr" ${language === 'tr' ? 'selected' : ''}>TR</option>
          </select>
        </li>
      </ul>
    </nav>
  `;
}
