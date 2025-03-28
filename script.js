let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const playerDisplay = document.getElementById("player");
const messageDisplay = document.getElementById("message");
const resetButton = document.getElementById("reset");

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWinner() {
    for (const condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            highlightWinner([a, b, c]);
            messageDisplay.textContent = `🎉 Player ${board[a]} Wins! 🎉`;
            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        messageDisplay.textContent = "It's a draw! 🤝";
    }
}

function highlightWinner(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add("win");
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.textContent = currentPlayer;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    playerDisplay.textContent = currentPlayer;
    messageDisplay.textContent = "";
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win", "taken");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
