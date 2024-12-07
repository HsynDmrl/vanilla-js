import { navbar } from './navbar.js';
import { footer } from './footer.js';
import { loader } from './loader.js';
import { store } from '../store/store.js';

export function layout(content = '') {
  const state = store.getState();
  const isLoading = state.loading; // Store'daki loading durumunu kontrol et

  return `
    <div id="layout">
      ${isLoading ? loader() : ''} 
      ${navbar()}
      <main id="content"><div id="content-grid">${content}</div></main> <!-- Dinamik içerik -->
      ${footer()} <!-- Footer -->
    </div>
  `;
}