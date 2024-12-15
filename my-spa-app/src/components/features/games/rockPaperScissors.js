export function RockPaperScissors() {
  function startGame(mode) {
    if (mode === 'classic') {
      window.navigate('/games/rock-paper-scissors/classic'); 
    } else if (mode === 'advanced') {
      window.navigate('/games/rock-paper-scissors/advanced');
    } else {
      alert('Invalid game mode selected.');
    }
  }

  function goBack() {
    window.navigate('/games'); 
  }

  return `
    <div class="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      <p>Welcome to the Rock Paper Scissors game! Choose your mode:</p>
      <div class="game-options">
        <div class="game-mode-card" onclick="(${startGame})('classic')">
          <img src="/src/assets/images/classic-mode-icon.png" alt="Classic Mode" class="game-mode-image" />
          <h3 class="game-mode-title">Classic Mode</h3>
        </div>
        <div class="game-mode-card" onclick="(${startGame})('advanced')">
          <img src="/src/assets/images/advenced-mode-icon.png" alt="Advanced Mode" class="game-mode-image" />
          <h3 class="game-mode-title">Advanced Mode</h3>
        </div>
      </div>
      <button class="back-button" onclick="(${goBack})()">Back to Games</button>
    </div>
  `;
}
