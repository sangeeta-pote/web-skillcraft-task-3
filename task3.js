let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const boardElement = document.getElementById('game-board');
const statusElement = document.getElementById('status');

// Initialize the board with clickable cells
function initializeBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
    updateStatus();
}

// Handle cell click events
function handleCellClick(index) {
    if (gameOver || board[index] !== '') return; // Ignore if cell is already clicked or game is over

    board[index] = currentPlayer;
    updateBoard();
    if (checkWin(currentPlayer)) {
        gameOver = true;
        statusElement.textContent = `${currentPlayer} wins!`;
        return;
    } else if (board.every(cell => cell !== '')) {
        gameOver = true;
        statusElement.textContent = "It's a draw!";
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

// Update the visual board
function updateBoard() {
    const cells = boardElement.getElementsByClassName('cell');
    Array.from(cells).forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Check if the current player has won
function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === player)
    );
}

// Update the game status message
function updateStatus() {
    statusElement.textContent = `${currentPlayer}'s turn`;
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    initializeBoard();
}

// Start the game
initializeBoard();
