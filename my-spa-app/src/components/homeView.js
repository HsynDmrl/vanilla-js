import { store } from '../store/store.js';
import apiCall from '../utils/apiCall.js';

export function homeView() {
  const state = store.getState();
  return `
    <h1>Home Page</h1>
    <p>Current Count: ${state.counter}</p>
    <button id="go-to-about">Go to About Page</button>
    <button id="load-data">Load Data</button>
  `;
}

function addHomeEventListeners() {
  document.getElementById('go-to-about')?.addEventListener('click', goToAboutHandler);
  document.getElementById('load-data')?.addEventListener('click', loadDataHandler);
}


function goToAboutHandler() {
  window.history.pushState({}, '', '/about');
}

async function loadDataHandler() {
  try {
    const data = await apiCall('test.json'); // API çağrısı yapılıyor
    console.log('Data loaded:', data);
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

export function homeViewWithListeners() {
  const view = homeView();
  setTimeout(() => addHomeEventListeners(), 0);
  return view;
}
