import { initializeClassicMode } from './initializeClassicMode.js';

export function ClassicMode() {
  const spriteSheet = new Image();
  spriteSheet.src = '/src/assets/images/sprite-rock.png'; 
  spriteSheet.onload = () => {
    initializeClassicMode(spriteSheet);
  };

  return `
    <div class="classic-mode">
      <h1>Classic Mode</h1>
      <canvas id="classic-mode-canvas" width="800" height="400" style="border:1px solid black;"></canvas>
      <button class="back-button" onclick="window.navigate('/games/rock-paper-scissors')">Back to Rock Paper Scissors</button>
    </div>
  `;
}
