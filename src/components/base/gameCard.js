import { getTranslations } from '../../core/utils/language/translations.js';
import { store } from '../../store/store.js';

export function GameCard({ id, title, description, imageUrl, onPlay }) {
  const { playButton } = getTranslations();
  const { playButtonMustLogin } = getTranslations();

  const state = store.getState();
  const isAuthenticated = state.auth?.isAuthenticated;
    
  return `
    <div class="game-card" id="${id}">
      <div class="game-card-header">
        <h3 class="game-card-title">${title}</h3>
      </div>
      <div class="game-card-content">
        <div class="game-card-image-container">
          <img src="${imageUrl}" alt="${title}" class="game-card-image" />
        </div>
      </div>
      <div class="game-card-body">
        <p class="game-card-description">${description}</p>
      </div>
      <div class="game-card-actions">
        ${isAuthenticated ?
            `<button class="game-card-button" onclick="(${onPlay})('${id}')">${playButton}</button>` :
            `<button class="game-card-button" onclick="event.preventDefault(); navigate('/login')">${playButtonMustLogin}</button>`
        }
      </div>
    </div>
  `;
}
