export function initializeAdvancedMode(spriteSheet) {
    const canvas = document.getElementById('advanced-mode-canvas');
    const ctx = canvas?.getContext('2d');
  
    if (!canvas || !ctx) {
      console.error('Canvas veya Context bulunamadı!');
      return;
    }
  
    // Canvas boyutları
    canvas.width = 800;
    canvas.height = 400;
  
    let userScore = 0;
    let computerScore = 0;
  
    // Sprite koordinatları ve boyutları
    const spriteData = {
      rock: { x: 44, y: 55, width: 84, height: 100 },
      paper: { x: 164, y: 68, width: 132, height: 77 },
      scissors: { x: 320, y: 70, width: 138, height: 69 },
      lizard: { x: 501, y: 49, width: 110, height: 110 },
      spock: { x: 644, y: 37, width: 97, height: 130 },
    };
  
    // Hitbox'lar (Kullanıcının tıklayabileceği alanlar)
    const clickZones = {
      rock: { x: 50, y: 200, width: 120, height: 120 },
      paper: { x: 200, y: 200, width: 120, height: 120 },
      scissors: { x: 350, y: 200, width: 120, height: 120 },
      lizard: { x: 500, y: 200, width: 120, height: 120 },
      spock: { x: 650, y: 200, width: 120, height: 120 },
    };
  
    // Oyunu başlat
    function playRound(userChoice) {
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      let result = '';
  
      if (userChoice === computerChoice) {
        result = "It's a draw!";
      } else if (
        (userChoice === 'rock' && (computerChoice === 'scissors' || computerChoice === 'lizard')) ||
        (userChoice === 'paper' && (computerChoice === 'rock' || computerChoice === 'spock')) ||
        (userChoice === 'scissors' && (computerChoice === 'paper' || computerChoice === 'lizard')) ||
        (userChoice === 'lizard' && (computerChoice === 'spock' || computerChoice === 'paper')) ||
        (userChoice === 'spock' && (computerChoice === 'scissors' || computerChoice === 'rock'))
      ) {
        result = 'You win!';
        userScore++;
      } else {
        result = 'Computer wins!';
        computerScore++;
      }
  
      drawResult(userChoice, computerChoice, result);
  
      // 4 saniye sonra başlangıç ekranını yeniden çiz
      setTimeout(drawInitialScreen, 4000);
    }
  
    // Sonuç ekranını çizer
    function drawResult(userChoice, computerChoice, result) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Arka plan
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Skorları çizer
      ctx.fillStyle = '#FFF';
      ctx.font = '24px Arial';
      ctx.fillText(`Your Score: ${userScore}`, 50, 50);
      ctx.fillText(`Computer Score: ${computerScore}`, 600, 50);
  
      // Kullanıcının ve bilgisayarın seçimini çizer
      drawSprite(ctx, spriteData[userChoice], 100, 50, spriteSheet);
      drawSprite(ctx, spriteData[computerChoice], 600, 50, spriteSheet);
  
      // Sonucu yazdır
      ctx.fillText(`Result: ${result}`, canvas.width / 2 - 100, canvas.height - 50);
    }
  
    // Sprite çizen yardımcı fonksiyon
    function drawSprite(ctx, sprite, x, y, sheet) {
      ctx.drawImage(sheet, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height);
    }
  
    // Kullanıcı tıklamalarını algılar
    canvas.addEventListener('click', (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
  
      for (const [choice, zone] of Object.entries(clickZones)) {
        if (
          mouseX >= zone.x &&
          mouseX <= zone.x + zone.width &&
          mouseY >= zone.y &&
          mouseY <= zone.y + zone.height
        ) {
          playRound(choice);
        }
      }
    });
  
    // Başlangıç ekranını çizer
    function drawInitialScreen() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Arka plan
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Seçenekleri çizer
      for (const [choice, zone] of Object.entries(clickZones)) {
        drawSprite(ctx, spriteData[choice], zone.x, zone.y, spriteSheet);
      }
  
      // Bilgilendirme
      ctx.fillStyle = '#FFF';
      ctx.font = '24px Arial';
      ctx.fillText('Choose your move!', canvas.width / 2 - 100, 50);
    }
  
    // Oyunu başlat
    drawInitialScreen();
  }
  