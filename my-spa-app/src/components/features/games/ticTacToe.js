export function TicTacToe() {
  function startGame(mode) {
    alert(`Starting Tic Tac Toe in ${mode === 'pvp' ? 'Player vs Player' : 'Player vs Computer'} mode.`);

  }

  function goBack() {
    window.navigate('/games'); 
  }

  return `
    <div class="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <p>Welcome to the Tic Tac Toe game!</p>
      <div class="game-options">
        <div class="game-mode-card" onclick="(${startGame})('pvp')">
          <img src="/src/assets/images/pvp-icon.png" alt="Player vs Player" class="game-mode-image" />
          <h3 class="game-mode-title">Player vs Player</h3>
        </div>
        <div class="game-mode-card" onclick="(${startGame})('pvc')">
          <img src="/src/assets/images/pvc-icon.png" alt="Player vs Computer" class="game-mode-image" />
          <h3 class="game-mode-title">Player vs Computer</h3>
        </div>
      </div>
      <button class="back-button" onclick="(${goBack})()">Back to Games</button>
    </div>
  `;
}
