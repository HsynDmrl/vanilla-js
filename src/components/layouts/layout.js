import { navbar } from '../common/navbar.js';
import { footer } from '../common/footer.js';
import { loader } from '../base/loader.js';
import { store } from '../../store/store.js';

export function layout(content = '') {
  const state = store.getState();
  const isLoading = state.loading;

  return `
    <div id="layout">
      ${isLoading ? loader() : ''} 
      <header>${navbar()}</header>
      <main id="content"><div id="content-grid">${content}</div></main> <!-- Dinamik içerik -->
      <footer>${footer()}</footer>
    </div>
  `;
}
