let cellElements = document.querySelectorAll(".cell");
let userActionX = [];
let userActionO = [];
let title = document.querySelector("h1");
let currentPlayer = 'X';

const winningCombinations = [
    ['item11', 'item22', 'item33'],
    ['item13', 'item22', 'item31'],
    ['item11', 'item21', 'item31'],
    ['item12', 'item22', 'item32'],
    ['item13', 'item23', 'item33']
];

cellElements.forEach(function (cell) {
    cell.addEventListener("click", function () {
        let element = this.id;
        console.log(cell);
        console.log(this.classList);
        let changeCellContent = document.getElementById(element);
        if (this.classList.contains('used') && (changeCellContent.innerHTML === 'X' || changeCellContent.innerHTML === 'O')) {
            return;
        } 
        changeCellContent.innerHTML = `${currentPlayer}`;
        if (currentPlayer === 'X') {
            userActionX.push(element);
        }
        else {
            userActionO.push(element);
        }

        let flag = checkTheWinner(winningCombinations,userActionX,currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        //I will use this like a flag that doesn't allow users to make click on a cell that has already something inside
        changeCellContent.classList.add('used');
    })

})

let count = 0;

function checkTheWinner(array,userAction,currentPlayer) {
    for (let combination of array) {
        if (combination.every(cell => userAction.includes(cell))) {
            title.innerHTML = currentPlayer + ' is the winner!';
            return true;
        }
    }
    if (array.length === 9) {
        title.innerHTML = 'It\'s a draw!';
    }
    return false;
}
