import { store } from '../store/store.js';

export function navbar() {
  const state = store.getState(); // Mevcut durumu al
  const isAuthenticated = state.auth?.isAuthenticated;
  const username = state.user?.user?.username || 'Guest';  // Eğer kullanıcı adı yoksa 'Guest' olarak göster
  
  return `
    <nav>
      <ul>
        <li><a href="/" onclick="event.preventDefault(); navigate('/')">Home</a></li>
        <li><a href="/about" onclick="event.preventDefault(); navigate('/about')">About</a></li>
        ${
          isAuthenticated
            ? `<li><a href="/profile" onclick="event.preventDefault(); navigate('/profile')">${username}</a></li>`  // Kullanıcı adı
            : `<li><a href="/login" onclick="event.preventDefault(); navigate('/login')">Login</a></li>`
        }
      </ul>
    </nav>
  `;
}
