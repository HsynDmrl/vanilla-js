import { Router } from './router/router.js';
import { layout } from './components/layouts/layout.js';
import { store } from './store/store.js';
import { LoginForm } from './components/features/LoginForm.js';
import { RegisterForm } from './components/features/RegisterForm.js';
import { ChatPage } from './components/pages/chatpage.js';
import { HomePage } from './components/pages/HomePage.js';
import { ProfilePage } from './components/pages/ProfilePage.js';
import { GamesPage } from './components/pages/gamesPage.js';
import { RockPaperScissors } from './components/features/games/rockPaperScissors.js';
import { TicTacToe } from './components/features/games/ticTacToe.js';
import { PingPong } from './components/features/games/pingPong.js';
import { PingPongPvC } from './components/features/games/pingPong/pingPongPvC.js';
import { PingPongPvP } from './components/features/games/pingPong/PingPongPvP.js';
import { AdvancedMode } from './components/features/games/rockPaperScissors/advancedMode.js';
import { ClassicMode } from './components/features/games/rockPaperScissors/classicMode.js';

// Tüm rotalar
const routes = {
  '/': HomePage,
  '/chat': ChatPage,
  '/login': LoginForm,
  '/register': RegisterForm,
  '/profile': ProfilePage,
  '/games': GamesPage,
  '/games/rock-paper-scissors': RockPaperScissors,
  '/games/tic-tac-toe': TicTacToe,
  '/games/ping-pong': PingPong,
  '/games/ping-pong/pvp': PingPongPvP, // PvP rotası
  '/games/ping-pong/pvc': PingPongPvC, // PvC rotası
  '/games/rock-paper-scissors/classic': ClassicMode, // Klasik mod rotası
  '/games/rock-paper-scissors/advanced': AdvancedMode, // Gelişmiş mod rotası
  '/404': () => '404 Not Found',
};

// Router'ı başlat
const router = new Router(routes, layout);

function navigate(path) {
  router.navigate(path);
}

// `navigate` fonksiyonunu global bağlama
window.navigate = navigate;

function startApp() {
  router.handleRouteChange();

  store.subscribe(() => router.handleRouteChange());
}

export { startApp };
