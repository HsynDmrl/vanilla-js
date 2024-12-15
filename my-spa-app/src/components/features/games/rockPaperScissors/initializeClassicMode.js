export function initializeClassicMode(spriteSheet) {
    const canvas = document.getElementById('classic-mode-canvas');
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
      rock: { x: 0, y: 0, width: 55, height: 144 },
      paper: { x: 65, y: 0, width: 60, height: 144 },
      scissors: { x: 123, y: 0, width: 85, height: 144 },
    };
  
    // Taş, kağıt, makas için canvas üzerindeki hitbox'lar
    const clickZones = {
      rock: { x: 100, y: 200, width: 120, height: 120 },
      paper: { x: 300, y: 200, width: 120, height: 120 },
      scissors: { x: 500, y: 200, width: 120, height: 120 },
    };
  
    // Oyunu başlat
    function playRound(userChoice) {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        let result = '';
      
        if (userChoice === computerChoice) {
          result = "It's a draw!";
        } else if (
          (userChoice === 'rock' && computerChoice === 'scissors') ||
          (userChoice === 'paper' && computerChoice === 'rock') ||
          (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
          result = 'Computer wins!';
          computerScore++; // Burada doğru skoru güncelliyoruz
        } else {
          result = 'You win!';
          userScore++; // Burada doğru skoru güncelliyoruz
        }
      
        drawResult(userChoice, computerChoice, result);
      
        // Bir süre sonra başlangıç ekranına dön
        setTimeout(drawInitialScreen, 4000); // 2 saniye bekle ve sonra başlangıç ekranını yeniden çiz
      }
      
      
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
  