let balance = 1000;
let multiplier = 1.0;
let gameInterval;
let isPlaying = false;

function updateDisplay() {
  document.getElementById('balance').innerText = balance.toFixed(2);
  document.getElementById('multiplier').innerText = multiplier.toFixed(2) + 'x';
}

function resetGame() {
  multiplier = 1.0;
  isPlaying = false;
  clearInterval(gameInterval);
  document.getElementById('betButton').disabled = false;
  document.getElementById('cashOutButton').disabled = true;
  document.getElementById('result').innerText = '';
  updateDisplay();
}

function placeBet() {
  if (balance < 10) {
    document.getElementById('result').innerText = 'Insufficient balance!';
    return;
  }

  balance -= 10;
  isPlaying = true;
  document.getElementById('betButton').disabled = true;
  document.getElementById('cashOutButton').disabled = false;
  updateDisplay();

  gameInterval = setInterval(() => {
    multiplier += 0.05;
    updateDisplay();

    if (Math.random() < 0.03) { // 3% chance of crashing
      document.getElementById('result').innerText = 'Crashed! You lost your bet.';
      resetGame();
    }
  }, 100); // Increase multiplier every 100 ms
}

function cashOut() {
  if (isPlaying) {
    balance += 10 * multiplier;
    document.getElementById('result').innerText = 'You cashed out at ' + multiplier.toFixed(2) + 'x!';
    resetGame();
  }
}

updateDisplay();
