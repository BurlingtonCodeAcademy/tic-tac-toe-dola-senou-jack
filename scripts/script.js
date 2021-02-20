let targId;
let targ;
let Xicon = `Xicon`;
let Oicon = `Oicon`;
let board = document.getElementById("board");
let count = 0;
let cells = document.getElementsByClassName("cell");


let startBut = document.getElementById("start");
let resetBut = document.getElementById("reset");

let currentPlayer = [];
let playerSwitch = true;
let curIcon;
let playerOneMoves = [];
let playerTwoMoves = [];

let playerOneScore = document.getElementById("playerOneScore");
let playerOneScoreJs = 0;
let playerTwoScore = document.getElementById("playerTwoScore");
let playerTwoScoreJs = 0;

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


//Reset Game => Not working
function resetBoard() {
    let delXIcon = document.querySelectorAll(".Xicon")
    let delOIcon = document.querySelectorAll(".Oicon")
 
    Array.from(delXIcon).forEach((cell) =>{
        cell.classList.remove("Xicon")
    })
    Array.from(delOIcon).forEach((cell) =>{
        cell.classList.remove("Oicon")
    })
 
    playerOneMoves = [];
    playerTwoMoves = [];
    currentPlayer = [];

    startBut.disabled = false;
    resetBut.disabled = true;
}

//Begin Game
startBut.addEventListener("click", (startFunction) => {
  startBut.disabled = true;
  resetBut.disabled = false;

  // function to switch turns
  // function to change player icon
  function playerTurn(evt) {
    if (playerSwitch === true) {
      currentPlayer = playerOneMoves;
      curIcon = Xicon;
    } else if (playerSwitch !== true) {
      currentPlayer = playerTwoMoves;
      curIcon = Oicon;
    }
  }

  // target the clicked image and getting it's Id
  function gamePlay(elmt) {
    console.log(targId);

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
      console.log(targId);

      //Switch Player
      playerSwitch = !playerSwitch;

    //   console.log(`player1 array ${playerOneMoves}`);
    //   console.log(`player2 array ${playerTwoMoves}`);
    //   console.log(`player array` , currentPlayer);

      //Inserting correct picture based off current player
      targ = document.getElementById(targId);
      targ.classList.add(curIcon)//= curIcon;
      //Check against Win Scenarios
      Object.keys(winS).forEach((win) => {
        if (
          //Win Conditions Check
          currentPlayer.includes(winS[win][0]) &&
          currentPlayer.includes(winS[win][1]) &&
          currentPlayer.includes(winS[win][2])
        ) {
          console.log(`you won!`);
          //Add to player score
          if (currentPlayer === playerOneMoves) {
            playerOneScoreJs = playerOneScoreJs + 1;
            playerOneScore.innerText = playerOneScoreJs;
          } else if (currentPlayer === playerTwoMoves) {
            playerTwoScoreJs = playerTwoScoreJs + 1;
            playerTwoScore.innerText = playerTwoScoreJs;
          }

          //Enter win state
          //Currentplayer score ++
        }
      });
    }
  }
  board.addEventListener("click", gamePlay);

  resetBut.addEventListener("click", resetBoard);
});
