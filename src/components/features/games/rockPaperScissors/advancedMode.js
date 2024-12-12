import { initializeAdvancedMode } from './initializeAdvancedMode.js';

export function AdvancedMode() {
    const spriteSheet = new Image();
    spriteSheet.src = '/src/assets/images/advenced-sheet.png'; 
    spriteSheet.onload = () => {
        initializeAdvancedMode(spriteSheet);
    };
  

  return `
    <div class="advanced-mode">
      <h1>Advanced Mode</h1>
      <canvas id="advanced-mode-canvas" width="800" height="400" style="border:1px solid black;"></canvas>
      <button class="back-button" onclick="window.navigate('/games/rock-paper-scissors')">Back to Rock Paper Scissors</button>
    </div>
  `;
}
