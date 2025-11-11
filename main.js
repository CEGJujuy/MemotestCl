// Emojis para las cartas
const cardEmojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎹'];

// Estado del juego
let gameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  startTime: null,
  timerInterval: null,
  isProcessing: false
};

// Inicializar el juego
function initGame() {
  // Resetear estado
  gameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    attempts: 0,
    startTime: Date.now(),
    timerInterval: null,
    isProcessing: false
  };

  // Crear pares de cartas
  const cardPairs = [...cardEmojis, ...cardEmojis];
  gameState.cards = shuffleArray(cardPairs);

  // Renderizar tablero
  renderBoard();
  updateStats();
  startTimer();

  // Ocultar modal de victoria
  document.getElementById('victory-modal').classList.add('hidden');
}

// Mezclar array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Renderizar tablero
function renderBoard() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';

  gameState.cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.textContent = '?';

    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = emoji;

    card.appendChild(cardBack);
    card.appendChild(cardFront);

    card.addEventListener('click', () => handleCardClick(index));
    board.appendChild(card);
  });
}

// Manejar clic en carta
function handleCardClick(index) {
  // Prevenir clics durante procesamiento
  if (gameState.isProcessing) return;

  const card = document.querySelector(`[data-index="${index}"]`);

  // Prevenir clic en cartas ya volteadas o emparejadas
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  // Voltear carta
  card.classList.add('flipped');
  gameState.flippedCards.push(index);

  // Si hay 2 cartas volteadas, verificar si coinciden
  if (gameState.flippedCards.length === 2) {
    gameState.attempts++;
    updateStats();
    checkMatch();
  }
}

// Verificar si las cartas coinciden
function checkMatch() {
  gameState.isProcessing = true;
  const [index1, index2] = gameState.flippedCards;
  const card1 = document.querySelector(`[data-index="${index1}"]`);
  const card2 = document.querySelector(`[data-index="${index2}"]`);

  if (gameState.cards[index1] === gameState.cards[index2]) {
    // Es un par
    setTimeout(() => {
      card1.classList.add('matched');
      card2.classList.add('matched');
      gameState.matchedPairs++;
      gameState.flippedCards = [];
      gameState.isProcessing = false;
      updateStats();
      checkVictory();
    }, 600);
  } else {
    // No es un par
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      gameState.flippedCards = [];
      gameState.isProcessing = false;
    }, 1000);
  }
}

// Verificar victoria
function checkVictory() {
  if (gameState.matchedPairs === cardEmojis.length) {
    stopTimer();
    setTimeout(() => {
      showVictoryModal();
    }, 500);
  }
}

// Mostrar modal de victoria
function showVictoryModal() {
  const modal = document.getElementById('victory-modal');
  const finalTime = document.getElementById('final-time');
  const finalAttempts = document.getElementById('final-attempts');

  finalTime.textContent = formatTime(Math.floor((Date.now() - gameState.startTime) / 1000));
  finalAttempts.textContent = gameState.attempts;

  modal.classList.remove('hidden');
}

// Actualizar estadísticas
function updateStats() {
  document.getElementById('pairs').textContent = `${gameState.matchedPairs}/${cardEmojis.length}`;
  document.getElementById('attempts').textContent = gameState.attempts;
}

// Iniciar temporizador
function startTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }

  gameState.timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - gameState.startTime) / 1000);
    document.getElementById('timer').textContent = formatTime(elapsed);
  }, 1000);
}

// Detener temporizador
function stopTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
}

// Formatear tiempo
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Event listeners
document.getElementById('restart').addEventListener('click', initGame);
document.getElementById('play-again').addEventListener('click', initGame);

// Iniciar juego al cargar
initGame();
