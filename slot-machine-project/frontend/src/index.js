document.addEventListener('DOMContentLoaded', () => {
  const symbols = ['star', 'lemon', 'orange', 'watermelon', 'cherries', 'bell', 'pharaoh'];
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

  const winLines = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2],
    [3, 3, 3, 3, 3],
    [0, 1, 2, 1, 0],
    [3, 2, 1, 2, 3],
    [0, 0, 1, 0, 0],
    [1, 2, 3, 2, 1],
    [2, 1, 0, 1, 2],
    [3, 3, 2, 3, 3],
    [0, 1, 1, 1, 0],
    [3, 2, 2, 2, 3],
    [1, 0, 0, 0, 1],
    [2, 3, 3, 3, 2],
    [0, 1, 0, 1, 0],
    [3, 2, 3, 2, 3],
    [1, 1, 2, 1, 1],
    [2, 2, 1, 2, 2],
    [0, 2, 0, 2, 0],
    [3, 1, 3, 1, 3],
    [1, 2, 2, 2, 1],
    [2, 1, 1, 1, 2],
    [0, 2, 1, 2, 0],
    [3, 1, 2, 1, 3],
    [1, 0, 1, 0, 1],
    [2, 3, 2, 3, 2],
    [0, 3, 0, 3, 0],
    [3, 0, 3, 0, 3],
    [1, 3, 1, 3, 1],
    [2, 0, 2, 0, 2],
    [0, 1, 3, 1, 0],
    [3, 2, 0, 2, 3],
    [1, 2, 0, 2, 1],
    [2, 1, 3, 1, 2],
    [0, 3, 1, 3, 0],
    [3, 0, 2, 0, 3],
    [1, 3, 0, 3, 1],
    [2, 0, 3, 0, 2],
    [0, 1, 2, 1, 0],
    [3, 2, 1, 2, 3],
    [1, 3, 2, 3, 1],
    [2, 0, 1, 0, 2]
  ];

  const symbolMultipliers = {
    'star': [1, 2, 3, 5],
    'lemon': [0.5, 1, 1.8, 2.5],
    'orange': [0.4, 0.8, 1.5, 2],
    'watermelon': [0.3, 0.6, 1.2, 1.5],
    'cherries': [0.2, 0.5, 1, 1.2],
    'bell': [0.1, 0.3, 0.8, 1],
    'pharaoh': [0.1, 0.2, 0.4, 0.5]
  };

  const backgroundMusic = new Audio('/sounds/bg21.mp3');
  const spinSound = new Audio('/sounds/spin.mp3');
  const reelStopSound = new Audio('/sounds/reel-stop.mp3');
  const winSound = new Audio('/sounds/win.mp3');
  const changeCoinSound = new Audio('/sounds/change-coin.mp3');
  const insufficientBalanceSound = new Audio('/sounds/insufficient-balance.mp3');

  backgroundMusic.loop = true;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createReelSymbols(reel) {
    const symbolContainer = document.createElement('div');
    symbolContainer.className = 'symbol-container';
    const shuffledSymbols = shuffle([...symbols, ...symbols, ...symbols, ...symbols]);
    for (let i = 0; i < 20; i++) { // Увеличиваем количество иконок до 20
      const symbol = document.createElement('div');
      symbol.className = `symbol ${shuffledSymbols[i % shuffledSymbols.length]}`;
      console.log(`Creating symbol: ${symbol.className}`); // Добавим вывод в консоль
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
      createReelSymbols(reel);
      const symbolContainer = reel.querySelector('.symbol-container');
      symbolContainer.style.animationDuration = `${duration}s`;
      symbolContainer.classList.add('spin');
      setTimeout(() => {
        symbolContainer.classList.remove('spin');
        symbolContainer.style.top = '0';
        symbolContainer.classList.add('bounce');
        setTimeout(() => {
          symbolContainer.classList.remove('bounce');
          reelStopSound.play();
          resolve();
        }, 300);
      }, duration * 1000);
    });
  }

  function getReelSymbols() {
    return reels.map(reel => {
      const symbols = [];
      const symbolElements = reel.querySelector('.symbol-container').children;
      for (let i = 0; i < 4; i++) {
        symbols.push(symbolElements[i].className.split(' ')[1]);
      }
      return symbols;
    });
  }

  function animateWinningSymbols(symbols) {
    symbols.forEach(symbol => {
      const elements = document.querySelectorAll(`.symbol.${symbol}`);
      elements.forEach(element => {
        element.classList.add('highlight');
      });
    });
  }

  function checkWinningCombination() {
    const reelSymbols = getReelSymbols();
    winAmount = 0;
    const winningSymbols = new Set();
    winLines.forEach(line => {
      let count = 1;
      for (let i = 1; i < line.length; i++) {
        if (reelSymbols[i][line[i]] === reelSymbols[i - 1][line[i - 1]]) {
          count++;
        } else {
          break;
        }
      }
      if (count >= 3) {
        const winningSymbol = reelSymbols[0][line[0]];
        console.log(`Winning symbol: ${winningSymbol}, Count: ${count}`); // Отладочное сообщение
        winAmount += betPerLine * symbolMultipliers[winningSymbol][count - 3];
        winningSymbols.add(winningSymbol);
      }
    });
    if (winAmount > 0) {
      totalBalance += winAmount;
      winDisplay.textContent = winAmount.toFixed(2);
      winSound.play();
      animateWinningSymbols([...winningSymbols]);
      showWinModal(winAmount);
    }
    totalBalanceDisplay.textContent = totalBalance.toFixed(2);
  }

  function updateScreens() {
    betDisplay.textContent = betPerLine.toFixed(2);
  }

  spinButton.addEventListener('click', async () => {
    if (totalBalance < betPerLine) {
      showInsufficientBalanceModal();
      return;
    }
    totalBalance -= betPerLine;
    totalBalanceDisplay.textContent = totalBalance.toFixed(2);
    spinButton.disabled = true;
    spinSound.play();
    const durations = [2, 2.5, 3, 3.5, 4];
    const spinPromises = reels.map((reel, index) => spinReel(reel, durations[index]));
    await Promise.all(spinPromises);
    spinSound.pause();
    checkWinningCombination();
    spinButton.disabled = false;
  });

  document.getElementById('coinPlusButton').addEventListener('click', () => {
    betPerLine += 0.5;
    updateScreens();
    changeCoinSound.play();
  });

  document.getElementById('coinMinusButton').addEventListener('click', () => {
    if (betPerLine > 0.5) betPerLine -= 0.5;
    updateScreens();
    changeCoinSound.play();
  });

  document.getElementById('maxBetButton').addEventListener('click', () => {
    betPerLine = Math.floor(totalBalance);
    updateScreens();
    changeCoinSound.play();
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
      winAmountElement.textContent = winAmount.toFixed(2);
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
      location.reload();
    });
    modal.style.display = 'block';
    setTimeout(() => {
      modal.style.display = 'none';
      modal.remove();
      location.reload();
    }, 3000);
    insufficientBalanceSound.play();
  }

  updateScreens();
});
