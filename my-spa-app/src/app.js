import { Router } from './router/router.js';
import { layout } from './components/layouts/layout.js';
import { store } from './store/store.js';
import { LoginForm } from './components/features/loginForm.js';
import { RegisterForm } from './components/features/registerForm.js';
import { ChatPage } from './components/pages/chatpage.js';
import { HomePage } from './components/pages/homePage.js';
import { ProfilePage } from './components/pages/profilePage.js';
import { GamesPage } from './components/pages/gamesPage.js';
import { RockPaperScissors } from './components/features/games/rockPaperScissors.js';
import { TicTacToe } from './components/features/games/ticTacToe.js';
import { PingPong } from './components/features/games/pingPong.js';
import { PingPongPvC } from './components/features/games/pingPong/pingPongPvC.js';
import { PingPongPvP } from './components/features/games/pingPong/PingPongPvP.js';
import { AdvancedMode } from './components/features/games/rockPaperScissors/advancedMode.js';
import { ClassicMode } from './components/features/games/rockPaperScissors/classicMode.js';

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
  '/games/ping-pong/pvp': PingPongPvP,
  '/games/ping-pong/pvc': PingPongPvC,
  '/games/rock-paper-scissors/classic': ClassicMode,
  '/games/rock-paper-scissors/advanced': AdvancedMode,
  '/404': () => '404 Not Found',
};

const router = new Router(routes, layout);

function navigate(path) {
  router.navigate(path);
}

window.navigate = navigate;

function startApp() {
  router.handleRouteChange();

  store.subscribe(() => router.handleRouteChange());
}

export { startApp };
