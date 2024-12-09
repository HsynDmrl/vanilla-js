export function initializePingPong(mode) {
    const canvas = document.getElementById('ping-pong-canvas');
    const ctx = canvas?.getContext('2d');
  
    if (!canvas || !ctx) {
      console.error('Canvas veya Context bulunamadı!');
      return;
    }
  
    // Canvas ayarları
    canvas.width = 800;
    canvas.height = 600;
  
    // Paddle ve top tanımları
    const paddleWidth = 10;
    const paddleHeight = 100;
  
    const player1 = {
      x: 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: '#FFF',
      score: 0
    };

    const player2 = {
        x: canvas.width - paddleWidth - 10,
        y: canvas.height / 2 - paddleHeight / 2,
        width: paddleWidth,
        height: paddleHeight,
        color: '#FFF',
        score: 0
      };
      
    const opponent = {
      x: canvas.width - paddleWidth - 10,
      y: canvas.height / 2 - paddleHeight / 2,
      width: paddleWidth,
      height: paddleHeight,
      color: '#FFF',
      score: 0
    };
  
    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 7,
      speed: 7,
      velocityX: 5,
      velocityY: 5,
      color: '#FFF'
    };
  
    let wPressed = false;
    let sPressed = false;
    let isGamePaused = false;
    let gameOver = false;
    let upPressed = false;
    let downPressed = false;
    
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
    
    function keyDownHandler(event) {
      if (event.key === 'w') wPressed = true;
      if (event.key === 's') sPressed = true;
      if (event.key === 'ArrowUp') upPressed = true;
      if (event.key === 'ArrowDown') downPressed = true;
    }
    
    function keyUpHandler(event) {
      if (event.key === 'w') wPressed = false;
      if (event.key === 's') sPressed = false;
      if (event.key === 'ArrowUp') upPressed = false;
      if (event.key === 'ArrowDown') downPressed = false;
    }
    

      
    function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.velocityX = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
      ball.velocityY = (Math.random() * 2 - 1) * ball.speed;
    }
  
    function collision(player, ball) {
      return (
        ball.x - ball.radius < player.x + player.width &&
        ball.x + ball.radius > player.x &&
        ball.y - ball.radius < player.y + player.height &&
        ball.y + ball.radius > player.y
      );
    }
  
    function handleCollision(player) {
      const collidePoint = ball.y - (player.y + player.height / 2);
      const normalizedCollidePoint = collidePoint / (player.height / 2);
      const angle = (Math.PI / 4) * normalizedCollidePoint;
  
      const direction = ball.x < canvas.width / 2 ? 1 : -1;
  
      ball.velocityX = direction * ball.speed * Math.cos(angle);
      ball.velocityY = ball.speed * Math.sin(angle);
      ball.speed += 0.2;
    }
  
    function update() {
        if (isGamePaused || gameOver) return;
      
        // Player 1 hareketi (W ve S tuşları)
        if (wPressed && player1.y > 0) player1.y -= 8;
        if (sPressed && player1.y + player1.height < canvas.height) player1.y += 8;
      
        // PvP Modunda Player 2 hareketi (ArrowUp ve ArrowDown tuşları)
        if (mode === 'pvp') {
          if (upPressed && player2.y > 0) player2.y -= 8;
          if (downPressed && player2.y + player2.height < canvas.height) player2.y += 8;
        }
      
        // PvC Modunda Opponent (CPU) hareketi
        if (mode === 'pvc') {
          opponent.y += ball.y > opponent.y + opponent.height / 2 ? 5 : -5;
          opponent.y = Math.max(Math.min(opponent.y, canvas.height - opponent.height), 0);
        }
      
        // Top hareketi
        ball.x += ball.velocityX;
        ball.y += ball.velocityY;
      
        // Top yukarı/aşağı sınırdan sekme
        if (ball.y <= 0 || ball.y + ball.radius >= canvas.height) {
          ball.velocityY = -ball.velocityY;
        }
      
        // Top sol sınırdan çıkar (Opponent veya Player 2 skor alır)
        if (ball.x - ball.radius <= 0) {
          if (mode === 'pvp') {
            player2.score++;
            if (player2.score === 7) endGame('Player 2');
            else resetBall();
          } else if (mode === 'pvc') {
            opponent.score++;
            if (opponent.score === 7) endGame('Opponent');
            else resetBall();
          }
        }
      
        // Top sağ sınırdan çıkar (Player 1 skor alır)
        if (ball.x + ball.radius >= canvas.width) {
          player1.score++;
          if (player1.score === 7) endGame('Player 1');
          else resetBall();
        }
      
        // Çarpışma kontrolü (Player 1 ve Top)
        if (collision(player1, ball)) handleCollision(player1);
      
        // Çarpışma kontrolü (Player 2 veya Opponent ve Top)
        if (mode === 'pvp' && collision(player2, ball)) {
          handleCollision(player2);
        } else if (mode === 'pvc' && collision(opponent, ball)) {
          handleCollision(opponent);
        }
      }
      
      
  
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // Player 1 paddle
        ctx.fillStyle = player1.color;
        ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
      
        // Player 2 paddle (PvP Modu)
        if (mode === 'pvp') {
          ctx.fillStyle = player2.color;
          ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
        }
      
        // Opponent paddle (PvC Modu)
        if (mode === 'pvc') {
          ctx.fillStyle = opponent.color;
          ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);
        }
      
        // Ball
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      
        // Scores
        ctx.fillStyle = '#FFF';
        ctx.font = '24px Arial';
        ctx.fillText(`Player 1: ${player1.score}`, 20, 30);
        if (mode === 'pvp') {
          ctx.fillText(`Player 2: ${player2.score}`, canvas.width - 150, 30);
        } else if (mode === 'pvc') {
          ctx.fillText(`Opponent: ${opponent.score}`, canvas.width - 150, 30);
        }
      }
      
  
    function endGame(winner) {
      gameOver = true;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      ctx.fillStyle = '#FFF';
      ctx.font = '36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${winner} wins!`, canvas.width / 2, canvas.height / 2 - 50);
      ctx.fillText('Click to restart', canvas.width / 2, canvas.height / 2 + 50);
  
      canvas.addEventListener(
        'click',
        function restart() {
          location.reload();
        },
        { once: true }
      );
    }
  
    function gameLoop() {
      update();
      draw();
      if (!gameOver) requestAnimationFrame(gameLoop);
    }
  
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);
  
    resetBall();
    gameLoop();
  }
  