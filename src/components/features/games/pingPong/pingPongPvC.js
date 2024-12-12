import { initializePingPong } from './pingPong.js';

export function PingPongPvC() {
  setTimeout(() => {
    initializePingPong('pvc'); 
  }, 0);

  return `
    <div class="ping-pong-game">
      <h1>Ping Pong - Player vs Computer</h1>
      <canvas id="ping-pong-canvas" width="800" height="400" style="border:1px solid black;"></canvas>
      <button class="back-button" onclick="window.navigate('/games/ping-pong')">Back to Ping Pong</button>
    </div>
  `;
}
