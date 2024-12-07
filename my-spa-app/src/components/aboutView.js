import { store } from '../store/store.js';

export function aboutView() {
  const state = store.getState();
  return `
    <h1>About Page</h1>
  `;
}

function addAboutEventListeners() {
  document.getElementById('go-to-home')?.addEventListener('click', goToHomeHandler);
}

function goToHomeHandler() {
  window.history.pushState({}, '', '/home');
}

export function aboutViewWithListeners() {
  const view = aboutView();
  setTimeout(() => addAboutEventListeners(), 0);
  return view;
}
