document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var size = 4;
var totalMines = 3;
var board = {
  cells: []
};


function startGame () {
  newBoard(size);
  for (var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function newBoard(size){
  for (var i = 0; i <= size; i++){
    for (var j = 0; j<= size; j++){
      var newCell = {
        row: i,
        col: j,
        isMine: false,
        isMarked: false,
        hidden: true,
        surroundingMines: 0
      }
    board.cells.push(newCell)
    }
  }
  var mineCount = 0
  while (mineCount < totalMines) {
  var randomNum = Math.floor(Math.random() *  (size*size))
    if (!board.cells[randomNum].isMine) {
      board.cells[randomNum].isMine = true
      mineCount++
    }
  }
}

//attempt at resetting game

function resetGame() {
    location.reload();
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  for (i=0; i < board.cells.length; i++){
    if ((board.cells[i].isMine == true) && (board.cells[i].isMarked !== true)) {
      return;
      } else if  ((board.cells[i].isMine !== true) && (board.cells[i].hidden == true)) {
          return
      }
    }
    lib.displayMessage('You saved us!');
    return;
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0;
  for (var i=0; i<surrounding.length; i++)
  {
    if (surrounding[i].isMine == true)
    {
      count ++;
    }
  }
  return count;
}
