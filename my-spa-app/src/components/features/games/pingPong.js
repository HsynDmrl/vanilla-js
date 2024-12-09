export function PingPong() {
  function startGame(mode) {
    if (mode === 'pvp') {
      window.navigate('/games/ping-pong/pvp'); // PvP moduna yönlendir
    } else if (mode === 'pvc') {
      window.navigate('/games/ping-pong/pvc'); // PvC moduna yönlendir
    } else {
      alert('Invalid game mode selected.');
    }
  }

  function goBack() {
    window.navigate('/games'); // Oyunlar sayfasına geri dön
  }

  return `
    <div class="ping-pong">
      <h1>Ping Pong</h1>
      <p>Welcome to the Ping Pong game!</p>
      <div class="ping-pong-options">
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
