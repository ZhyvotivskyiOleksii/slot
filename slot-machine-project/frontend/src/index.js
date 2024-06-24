document.addEventListener('DOMContentLoaded', () => {
  const symbols = ['star', 'lemon', 'orange', 'watermelon', 'cherries', 'bell'];
  const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3'),
    document.getElementById('reel4'),
    document.getElementById('reel5')
  ];
  const spinButton = document.getElementById('spinButton');
  const betDisplay = document.getElementById('bet');
  const winDisplay = document.getElementById('win');
  const totalBalanceDisplay = document.getElementById('totalBalance');
  const loadingScreen = document.getElementById('loadingScreen');
  const startButton = document.getElementById('startButton');
  const slotMachine = document.querySelector('.slot-machine');
  const closeButton = document.getElementById('closeButton');
  const muteButton = document.getElementById('muteButton');
  const volumeControl = document.getElementById('volumeControl');
  const winModal = document.getElementById('winModal');
  const winAmountElement = document.getElementById('winAmount');

  let totalBalance = 1000; // Total balance
  let betPerLine = 0.5;  // Coin value per line
  let winAmount = 0;
  let isMuted = false;

  // Звуки
  const backgroundMusic = new Audio('/sounds/bg21.mp3');
  const spinSound = new Audio('/sounds/spin.mp3'); // Звук вращения барабанов
  const reelStopSound = new Audio('/sounds/reel-stop.mp3'); // Звук остановки каждого барабана
  const winSound = new Audio('/sounds/win.mp3'); // Звук выигрыша
  const changeCoinSound = new Audio('/sounds/change-coin.mp3'); // Звук изменения ставки
  const insufficientBalanceSound = new Audio('/sounds/insufficient-balance.mp3'); // Звук недостаточно средств

  backgroundMusic.loop = true;

  function createReelSymbols(reel) {
    const symbolContainer = document.createElement('div');
    symbolContainer.className = 'symbol-container';
    for (let i = 0; i < 16; i++) {
      const symbol = document.createElement('div');
      symbol.className = `symbol ${symbols[Math.floor(Math.random() * symbols.length)]}`;
      symbolContainer.appendChild(symbol);
    }
    clearReel(reel);
    reel.appendChild(symbolContainer);
  }

  function clearReel(reel) {
    while (reel.firstChild) {
      reel.removeChild(reel.firstChild);
    }
  }

  reels.forEach(reel => {
    createReelSymbols(reel);
  });

  function spinReel(reel, duration) {
    return new Promise(resolve => {
      const symbolContainer = reel.querySelector('.symbol-container');
      symbolContainer.style.animationDuration = `${duration}s`;
      symbolContainer.classList.add('spin');
      setTimeout(() => {
        symbolContainer.classList.remove('spin');
        symbolContainer.style.top = '0';
        symbolContainer.classList.add('bounce');
        setTimeout(() => {
          symbolContainer.classList.remove('bounce');
          reelStopSound.play(); // Звук остановки барабана
          resolve();
        }, 300); // Bounce duration
      }, duration * 1000);
    });
  }

  function checkWinningCombination() {
    winAmount = 0;
    const winSymbols = [];
    const winningReels = reels.map(reel => reel.querySelector('.symbol-container').children[0].className.split(' ')[1]);
    const isWinning = winningReels.every(symbol => symbol === winningReels[0]);

    if (isWinning) {
      winAmount = betPerLine * 10; // Example win multiplier
      totalBalance += winAmount; // Add win amount to total balance
      totalBalanceDisplay.textContent = totalBalance;
      winDisplay.textContent = winAmount;
      winSymbols.push(...winningReels);
      animateWinningSymbols(winSymbols);
      winSound.play(); // Звук выигрыша
      showWinModal(winAmount); // Show the modal with the win amount
    }
  }

  function animateWinningSymbols(symbols) {
    symbols.forEach(symbol => {
      const elements = document.querySelectorAll(`.symbol.${symbol}`);
      elements.forEach(element => {
        element.classList.add('highlight');
      });
    });
  }

  function updateScreens() {
    betDisplay.textContent = betPerLine;
  }

  spinButton.addEventListener('click', async () => {
    if (totalBalance < betPerLine) {
      showInsufficientBalanceModal();
      return;
    }
    totalBalance -= betPerLine; // Deduct bet amount from total balance
    totalBalanceDisplay.textContent = totalBalance;
    spinButton.disabled = true; // Disable spin button while spinning
    spinSound.play(); // Запуск звука вращения
    const durations = [2, 2.5, 3, 3.5, 4]; // Different durations for each reel
    const spinPromises = reels.map((reel, index) => spinReel(reel, durations[index]));
    await Promise.all(spinPromises);
    spinSound.pause(); // Остановка звука вращения
    checkWinningCombination(); // Check for a winning combination after all reels have spun
    spinButton.disabled = false; // Re-enable spin button
  });

  document.getElementById('coinPlusButton').addEventListener('click', () => {
    betPerLine += 0.5;
    updateScreens();
    changeCoinSound.play(); // Звук изменения ставки
  });

  document.getElementById('coinMinusButton').addEventListener('click', () => {
    if (betPerLine > 0.5) betPerLine -= 0.5;
    updateScreens();
    changeCoinSound.play(); // Звук изменения ставки
  });

  document.getElementById('maxBetButton').addEventListener('click', () => {
    betPerLine = Math.floor(totalBalance);
    updateScreens();
    changeCoinSound.play(); // Звук изменения ставки
  });

  startButton.addEventListener('click', () => {
    loadingScreen.style.display = 'none';
    slotMachine.style.display = 'block';
    backgroundMusic.play();
  });

  closeButton.addEventListener('click', () => {
    slotMachine.style.display = 'none';
    loadingScreen.style.display = 'block';
    backgroundMusic.pause();
  });

  muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    muteButton.textContent = isMuted ? '🔇' : '🔊';
  });

  volumeControl.addEventListener('input', (e) => {
    backgroundMusic.volume = e.target.value;
  });

  function showWinModal(winAmount) {
    if (winAmount > 0) {
      winAmountElement.textContent = winAmount;
      winModal.style.display = 'block';
      const closeBtn = winModal.querySelector('.close');
      closeBtn.addEventListener('click', () => {
        winModal.style.display = 'none';
      });
      setTimeout(() => {
        winModal.style.display = 'none';
      }, 3000);
    }
  }

  function showInsufficientBalanceModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Недостатньо коштів. Будь ласка, оновіть cторінку для поповнення балансу на 1000 кредитів.</p>
      </div>
    `;
    document.body.appendChild(modal);
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.remove();
      location.reload(); // Reload the page to reset the game
    });
    modal.style.display = 'block';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.remove();
      location.reload(); // Reload the page to reset the game
    }, 3000);
    insufficientBalanceSound.play(); // Звук недостаточно средств
  }

  updateScreens();
});
