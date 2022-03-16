let players = ['X', 'O'];
let activePlayer = 0;

let line = 0;  //Номер строки в которой был ход
let column = 0;   //Столбец

let userField = 0;  // Размер поля,которое вводит пользователь
let board = [];  // Игровое поле


function startGame() {
  userField = +prompt("Введите размер поля", "3");
  board = createField(userField);
  renderBoard(board);
}


function click(row, col) {
  line = row;   //Получаем номер строки в которой сделан ход
  column = col;   //Получаем номер колонки в которой сделан ход

  // Очередность хода
  if (activePlayer === 0) {
    board[row][col] = players[activePlayer];
    activePlayer++;
  } else {
    board[row][col] = players[activePlayer];
    activePlayer--;
  }

  renderBoard(board);
  checkWinner(board);
}

// Проверка победителя
function checkWinner(array) {
  let colWinner = checkArrayCol(array);
  let rowWinner = checkArrayRow(array);
  let diagonalWinner;

  //Проверяем диагональ, если был ход в диагональной ячейке
  if ((line - column === 0) || (+line + +column === userField - 1)) {
    console.log("Проверяем диагональ");
    if (checkDiagonal(array)) {
      diagonalWinner = true;
    } else if (checkDiagonal(array.slice().reverse())) {
      diagonalWinner = true
    } else {
      diagonalWinner = false;
    }
  } else {
    console.log("Не проверяем диагональ");
  }

  // Проверка победителя
  if (colWinner || rowWinner || diagonalWinner) {
    console.log("Есть победитель");
    showWinner(activePlayer);
  } else {
    console.log("Играем дальше");
  }
}


// Проверка по столбцам
function checkArrayCol(board) {

  // Первый элемент с которым сравниваем последующие
  let arrayFirstItem = board[0][column];

  for (let k = 0; k < board.length - 1; k++) {

    if (arrayFirstItem !== board[k + 1][column]) {
      return false;
    }
  }

  if (board[0][column] === "") return false;

  return true;
}


// проверка по сторочкам
function checkArrayRow(array) {

  for (let k = 0; k < array[line].length - 1; k++) {

    if (array[line][0] !== array[line][k + 1]) return false;
  }

  if (array[line][0] === "") return false;

  return true;
}


// Проверка диагонали
function checkDiagonal(array) {

  for (let i = 0; i < array.length - 1; i++) {

    let firstElement = array[0][0];

    if (firstElement !== array[i + 1][i + 1]) {
      
      return false;
    }
  }

  if (array[0][0] === "") return false;

  return true;
}


// Создание поля произвольного размера
function createField(fieldSize) {

  let playingField = [];

  for (let i = 0; i < fieldSize; i++) {

    let subPlayingField = [];

    for (let k = 0; k < fieldSize; k++) {
      subPlayingField.push('');
    }

    playingField.push(subPlayingField);
  }

  return playingField;
}