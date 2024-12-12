import { getTranslations } from '../../core/utils/language/translations.js';
import { RockPaperScissors } from '../features/games/rockPaperScissors.js';
import { TicTacToe } from '../features/games/ticTacToe.js';
import { PingPong } from '../features/games/pingPong.js';
import { GameCard } from '../base/gameCard.js';

export function GamesPage() {
  const translations = getTranslations(); 

  const gamesData = [
    {
      id: 'rock-paper-scissors',
      title: translations.rockPaperScissorsTitle,
      description: translations.rockPaperScissorsDescription,
      imageUrl: '/src/assets/images/rock-paper-scissors.png',
      component: RockPaperScissors
    },
    {
      id: 'tic-tac-toe',
      title: translations.ticTacToeTitle,
      description: translations.ticTacToeDescription,
      imageUrl: '/src/assets/images/tic-tac-toe.png',
      component: TicTacToe
    },
    {
      id: 'ping-pong',
      title: translations.pingPongTitle,
      description: translations.pingPongDescription,
      imageUrl: '/src/assets/images/ping-pong.png',
      component: PingPong
    }
  ];

  return `
    <div class="games-page">
      <h1>${translations.gamesPageTitle}</h1>
      <div class="games-container">
        ${gamesData
          .map((game) =>
            GameCard({
              id: game.id,
              title: game.title,
              description: game.description,
              imageUrl: game.imageUrl,
              onPlay: navigateToGame
            })
          )
          .join('')}
      </div>
    </div>
  `;
}

function navigateToGame(gameId) {
  window.navigate(`/games/${gameId}`);
}
