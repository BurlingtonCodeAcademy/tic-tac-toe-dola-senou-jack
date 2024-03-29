// all variables
let targId;
let targ;
let Xicon = `Xicon`;
let Oicon = `Oicon`;
let board = document.getElementById("board");
let count = 0;
let cells = document.getElementsByClassName("cell");
//buttons variables
let startBut = document.getElementById("start");
let resetBut = document.getElementById("reset");
let restartBut = document.getElementById("restartGame");
// player moves
let playerMoves = [];
let compMoves = [];
let compCell;
let cellName;
let randNum;
let playerTurn = 0;
//score variables
let playerOneScore = document.getElementById("playerOneScore");
let playerOneScoreJs = 0;
let playerTwoScore = document.getElementById("playerTwoScore");
let playerTwoScoreJs = 0;
//timer variables
let seconds = document.getElementById("seconds");
let secondsNum = 0;
let minutes = document.getElementById("minutes");
let minutesNum = 0;
let timers;
/// passing player names
let playersName = document.location.search.slice(1);
let playerOneName = playersName;
let playerTwoName = `Computer`;
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
let goHome = document.getElementById("goHome");

// getting names from url and sanitizing them
playerOneName =
  playerOneName.slice(0, 1).toLocaleUpperCase() +
  playerOneName.slice(1).toLowerCase();
p1Name.innerText = playerOneName;

// winning conditions
let winS = {
  row1: ["cell-0", "cell-1", "cell-2"],
  row2: ["cell-3", "cell-4", "cell-5"],
  row3: ["cell-6", "cell-7", "cell-8"],

  colmn1: ["cell-0", "cell-3", "cell-6"],
  colmn2: ["cell-1", "cell-4", "cell-7"],
  colmn3: ["cell-2", "cell-5", "cell-8"],

  diagonal: ["cell-0", "cell-4", "cell-8"],
  rdiagonal: ["cell-6", "cell-4", "cell-2"],
};

// timming interval
function timer() {
  //single digit seconds
  if (minutesNum <= 60) {
    if (secondsNum < 9) {
      secondsNum++;
      seconds.innerText = `0${secondsNum}`;
      //double digit seconds
    } else if (secondsNum < 60) {
      secondsNum++;
      seconds.innerText = secondsNum;
      //minutes interval
    } else if ((secondsNum = 60)) {
      //single digit minutes
      if (minutesNum < 9) {
        minutesNum++;
        secondsNum = `00`;
        seconds.innerText = secondsNum;
        minutes.innerText = `0${minutesNum}`;
        //double  digit minutes
      } else {
        minutesNum++;
        secondsNum = 00;
        seconds.innerText = secondsNum;
        minutes.innerText = minutesNum;
      }
    }
    // if the game was left more than 60 minutes it will reset and throw an alert
  } else if (minutesNum > 60) {
    resetBoard;
    alert(`Game time limit\nStart a new game`);
  }
}
// Go home button
goHome.addEventListener("click", (elmnt) => {
  window.location.assign(`http://localhost:5500/index.html`);
});
//Reset Game
function resetBoard() {
  clearInterval(timers);
  let delXIcon = document.querySelectorAll(".Xicon");
  let delOIcon = document.querySelectorAll(".Oicon");
  //remove X icon picture
  Array.from(delXIcon).forEach((cell) => {
    cell.classList.remove("Xicon");
  });
  //remove O icon picture
  Array.from(delOIcon).forEach((cell) => {
    cell.classList.remove("Oicon");
  });
  //reset all variables
  playerMoves = [];
  compMoves = [];
  playerTurn = 0;
  startBut.disabled = false;
  resetBut.disabled = true;
  board.removeEventListener("mousedown", gamePlay);
}

//Reset Game button
function restartGame() {
  secondsNum = 0;
  minutesNum = 0;
  seconds.innerText = `0${secondsNum}`;
  minutes.innerText = `0${minutesNum}`;
  resetBoard();
  playerTwoScore.innerText = 0;
  playerOneScore.innerText = 0;
}
///game play
function gamePlay(elmnt) {
  targId = elmnt.target.id;

  // blocking player from chossing an existing cell
  if (
    (playerMoves.includes(targId) ||
      compMoves.includes(targId) ||
      targId === "board") &&
    playerTurn < 5
  ) {
    alert(`please choose an empty cell`);
  }
  // if the cell is not chosen player makes his move
  if (
    !playerMoves.includes(targId) &&
    !compMoves.includes(targId) &&
    targId !== "board"
  ) {
    playerMoves.push(targId);

    targ = document.getElementById(targId);

    targ.classList.add(Xicon);
    playerTurn++;

    ///computer moves
    randNum = Math.floor(Math.random() * 7 + 1);

    cellName = `cell-${randNum}`;

    if (playerTurn <= 5) {
      if (playerMoves.includes(cellName) || compMoves.includes(cellName)) {
        randNum = 0;

        while (
          randNum <= 7 &&
          (playerMoves.includes(cellName) || compMoves.includes(cellName))
        ) {
          randNum++;

          cellName = `cell-${randNum}`;
        }
      }
    }
  }

  if (!playerMoves.includes(cellName) && !compMoves.includes(cellName)) {
    compMoves.push(cellName);

    targ = document.getElementById(`${cellName}`);
    targ.classList.add(Oicon);
  }

  let gameIsWon = false;
  //Check against Win Scenarios
  Object.keys(winS).forEach((win) => {
    if (
      //Win Conditions Check
      playerMoves.includes(winS[win][0]) &&
      playerMoves.includes(winS[win][1]) &&
      playerMoves.includes(winS[win][2])
    ) {
      //Create for each loop to add a class to each cell
      let winCells = [winS[win][0], winS[win][1], winS[win][2]];
      console.log("Win Cells: ", winCells);
      gameIsWon = true;
      //Iterate over winning cells and add class
      winCells.forEach((cell) => {
        let singleCell = document.getElementById(cell);
        singleCell.classList.add("win-cell-style-one");
      });

      //Reseting the board after a given timeout
      function winReset() {
        playerOneScoreJs = playerOneScoreJs + 1;
        alert(`${playerOneName} Won!!!`);
        resetBoard();
        playerOneScore.innerText = playerOneScoreJs;

        //Removing the win class
        winCells.forEach((cell) => {
          let singleCell = document.getElementById(cell);
          singleCell.classList.remove("win-cell-style-one");
          console.log("In the Foreach");
          winCells = [];
          gameIsWon = false;
        });
      }

      //Call Win alert function after 500ms and reset board//
      setTimeout(winReset, 500);
    }

    //Add to player score
    else if (
      compMoves.includes(winS[win][0]) &&
      compMoves.includes(winS[win][1]) &&
      compMoves.includes(winS[win][2])
    ) {
      //Create for each loop to add a class to each cell
      let winCells = [winS[win][0], winS[win][1], winS[win][2]];
      console.log("Win Cells: ", winCells);
      gameIsWon = true;
      //Iterate over winning cells and add highlight class
      winCells.forEach((cell) => {
        let singleCell = document.getElementById(cell);
        singleCell.classList.add("win-cell-style-two");
      });

      //Reseting the board after a given timeout
      function winReset() {
        playerTwoScoreJs = playerTwoScoreJs + 1;
        alert(`${playerTwoName} Won!!!`);
        resetBoard();
        playerTwoScore.innerText = playerTwoScoreJs;

        //Removing the win class
        winCells.forEach((cell) => {
          let singleCell = document.getElementById(cell);
          singleCell.classList.remove("win-cell-style-two");
          console.log("In the Foreach");
          winCells = [];
          gameIsWon = false;
        });
      }

      //Call Win alert function after 500ms and reset board//
      setTimeout(winReset, 500);
    }
  });
  //draw condition
  if (playerTurn == 5 && gameIsWon === false) {
    function test() {
      alert(`It's a draw`);
      resetBoard();
    }
    setTimeout(test, 500);
  }
}

//Begin Game
startBut.addEventListener("click", (startFunction) => {
  //default player name red color
  p1Name.style.color = "red";
  //timer resets
  secondsNum = 0;
  minutesNum = 0;
  seconds.innerText = `0${secondsNum}`;
  minutes.innerText = `0${minutesNum}`;
  //timer starts
  timers = setInterval(timer, 1000);
  //switching avalability for buttons
  startBut.disabled = true;
  resetBut.disabled = false;

  // allowing the cards to flip
  board.addEventListener("mousedown", gamePlay);
});
//reset button
resetBut.addEventListener("click", resetBoard);
//reset the whole game button
restartBut.addEventListener("click", restartGame);
