//Variables
let cellElements = document.querySelectorAll(".cell");
let userActionX = [];
let userActionO = [];
let title = document.querySelector("h1");
let currentPlayer = 'X';
let flag = false;
let buttonRestartGame = document.querySelector(".button")
let gameOver = false;

//Array of winningCombination
const winningCombinations = [
    ['item11', 'item22', 'item33'],
    ['item13', 'item22', 'item31'],
    ['item11', 'item21', 'item31'],
    ['item12', 'item22', 'item32'],
    ['item13', 'item23', 'item33'],
    ['item11', 'item12', 'item13'],
    ['item21', 'item22', 'item23'],
    ['item31', 'item32', 'item33']
];

cellElements.forEach(function (cell) {
    cell.addEventListener("click", function () {
        //If game is over we can't make click on another cell(chenge the content of the cell)
        if(gameOver){
            return;
        }

        //The id of the cell and the elemet that will be modified
        let element = this.id;
        let changeCellContent = document.getElementById(element);

        //Check if the cell has the 'used' class for saving the current content of the cell
        if (this.classList.contains('used') && (changeCellContent.innerHTML === 'X' || changeCellContent.innerHTML === 'O')) {
            return;
        }
        //Changed the content of the current cell
        changeCellContent.innerHTML = `${currentPlayer}`;

        //Check the current player and push he id element on the specific array
        if (currentPlayer === 'X') {
            userActionX.push(element);
        }
        else {
            userActionO.push(element);
        }

        //Flag used for restart the game
        flag = checkTheWinner(winningCombinations, userActionX,userActionO, currentPlayer);

        //Change the current player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        //I will use this like a flag that doesn't allow users to make click on a cell that has already something inside
        changeCellContent.classList.add('used');

        //If we want to restart the game
        if (flag === true) {
            gameOver = true;
            buttonRestartGame.addEventListener("click", function () {
                location.reload();
            });
        }
    })
})

function checkTheWinner(array, userAction1,userAction2, currentPlayer) {
    for (let combination of array) {
        if (combination.every(cell => userAction1.includes(cell))) {
            title.innerHTML = currentPlayer + ' is the winner!';
            return true;
        }
        if (combination.every(cell => userAction2.includes(cell))) {
            title.innerHTML = currentPlayer + ' is the winner!';
            return true;
        }
    }
    if (userActionX.length + userActionO.length === 9) {
        title.innerHTML = 'It\'s a draw!';
    }
    return false;
}
