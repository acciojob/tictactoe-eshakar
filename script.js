//your JS code here. If required.
const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const gameContainer = document.getElementById('game-container');
const turnMessage = document.getElementById('turn-message');
const gridElement = document.getElementById('grid');
const restartButton = document.getElementById('restart-button');

let currentPlayer, player1Name, player2Name;
const board = Array(9).fill(null);
const winningCombinations = [
	[0, 1, 2], [3, 4, 5], [6, 7, 8],
	[0, 3, 6], [1, 4, 7], [2, 5, 8],
	[0, 4, 8], [2, 4, 6]
];

submitButton.addEventListener('click', startGame);
gridElement.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', resetGame);

function startGame() {
	player1Name = player1Input.value;
	player2Name = player2Input.value;

	if (!player1Name || !player2Name) return;
	currentPlayer = player1Name;
	gameContainer.style.display = 'block';
	document.getElementById('input-container').style.display = 'none';
	turnMessage.innerText = `${currentPlayer}, you're up`;
	createGrid();
}

function createGrid() {
	gridElement.innerHTML = '';
	board.fill(null);
	for (let i = 0; i < 9; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.id = i;
		gridElement.appendChild(cell);
	}
}

function handleCellClick(event) {
	const cellIndex = event.target.id;
	if (cellIndex === '') return;

	if (board[cellIndex] || checkWinner()) return;
	board[cellIndex] = currentPlayer === player1Name ? 'X' : 'O';
	event.target.innerText = board[cellIndex];
    checkWinner();
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    if(!checkWinner()) {
        turnMessage.innerText = `${currentPlayer}, you're up`;
    }
}

 function checkWinner() {
    for (const combination of winningCombinations) {
		const [a, b, c] = combination;
	    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            setWinner(a, b, c);
            return true;
	    }
	}

    if (!board.includes(null)) {
        turnMessage.innerText = "It's a draw!";
        restartButton.style.display = 'block';
    }
    return false;
}

function setWinner(a, b, c) {
    turnMessage.innerText = `${currentPlayer}, congratulations you won!`;
    document.getElementById(a).classList.add('winner');
    document.getElementById(b).classList.add('winner');
    document.getElementById(c).classList.add('winner');
	restartButton.style.display = 'block';
}

function resetGame() {
    currentPlayer = player1Name;
	turnMessage.innerText = `${currentPlayer}, you're up`;
    restartButton.style.display = 'none';
    createGrid();
}


