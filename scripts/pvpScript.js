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
let currentPlayer = [];
let playerSwitch = true;
let curIcon;
let playerOneMoves = [];
let playerTwoMoves = [];
let playerHandTurn = 0;
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
let playersName = document.location.search.slice(1).split("-");
let playerOneName = playersName[0];
let playerTwoName = playersName[1];
let p1Name = document.getElementById("p1Name");
let p2Name = document.getElementById("p2Name");
// getting names from url and sanitizing them
playerOneName =
  playerOneName.slice(0, 1).toLocaleUpperCase() +
  playerOneName.slice(1).toLowerCase();
playerTwoName =
  playerTwoName.slice(0, 1).toLocaleUpperCase() +
  playerTwoName.slice(1).toLowerCase();
p1Name.innerText = playerOneName;
p2Name.innerText = playerTwoName;

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
    // if the game was left more than 1 hour it will reset and throw an alert
  } else if (minutesNum > 60) {
    resetBoard;
    alert(`Game time limit\nStart a new game`);
  }
}
// Go home button
goHome.addEventListener("click", (elmnt) => {
  window.location.assign(
    `/index.html`
  );
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
  p1Name.style.color = "red";
  p2Name.style.color = "black";
  playerOneMoves = [];
  playerTwoMoves = [];
  currentPlayer = [];
  playerHandTurn = 0;
  startBut.disabled = false;
  resetBut.disabled = true;
  board.removeEventListener("mousedown", gamePlay);
}

// function to switch turns
function playerTurn(evt) {
  //makes current player PLAYER 1
  if (playerSwitch === true) {
    currentPlayer = playerOneMoves;
    // change current icon to X
    curIcon = Xicon;
    //switch name color
    p1Name.style.color = "black";
    p2Name.style.color = "red";

    //makes current player PLAYER 2
  } else if (playerSwitch !== true) {
    currentPlayer = playerTwoMoves;
    // change current icon to O
    curIcon = Oicon;
    //switch name color
    p1Name.style.color = "red";
    p2Name.style.color = "black";
  }
}

// target the clicked image and getting it's Id
function gamePlay(elmt) {
  playerTurn();
  //Grab parent element of clicked target
  targId = elmt.target.id;
  //Guard clause against previously plays
  if (
    !playerOneMoves.includes(targId) &&
    !playerTwoMoves.includes(targId) &&
    targId !== "board"
  ) {
    currentPlayer.push(targId);
    // console.log(targId);
    playerHandTurn++;
    //Switch Player
    playerSwitch = !playerSwitch;

    //Inserting correct picture based off current player
    targ = document.getElementById(targId);
    targ.classList.add(curIcon);
    let gameIsWon = false;

    //Check against Win Scenarios
    Object.keys(winS).forEach((win) => {
      if (
        //Win Conditions Check
        currentPlayer.includes(winS[win][0]) &&
        currentPlayer.includes(winS[win][1]) &&
        currentPlayer.includes(winS[win][2])
      ) {
        //Add to player score
        if (currentPlayer === playerOneMoves) {
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
        } else if (currentPlayer === playerTwoMoves) {
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
      }
    });
    // draw condition
    if (playerHandTurn == 9) {
      alert(`It's a draw`);
      resetBoard();
    }
  }
  // blocking player from chossing an existing cell
  else if (
    playerOneMoves.includes(targId) ||
    playerTwoMoves.includes(targId) ||
    targId === "board"
  ) {
    alert(`please choose an empty cell`);
  }
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
