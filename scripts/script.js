let targId;
let targ;
let Xicon = `Xicon`;
let Oicon = `Oicon`;
let board = document.getElementById("board");
let count = 0;
let cells = document.getElementsByClassName("cell")

let startBut = document.getElementById("start");
let resetBut = document.getElementById("reset");

let currentPlayer = [];
let playerSwitch = true;
let curIcon;
let playerOneMoves = [];
let playerTwoMoves = [];

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

console.log(board)
function resetGame() {
    for(let cell of cells) {
        cell.classList = "";
        curIcon = ""
        // cell.class = '';
        // curIcon = ""
    }
    
    playerOneMoves = [];
    playerTwoMoves = [];
    currentPlayer = [];
    
    startBut.disabled = false;
    resetBut.disabled = true;
    console.log(cells)
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
  function gamePlay (elmt) {
    console.log(targId);

    //   console.log(currentPlayer.includes(targId));

    //   console.log(`player1 array ${playerOneMoves}`);
    //   console.log(`player2 array ${playerTwoMoves}`);
    //   console.log(`player array ${currentPlayer}`);

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


      console.log(`player1 array ${playerOneMoves}`);
      console.log(`player2 array ${playerTwoMoves}`);
      console.log(`player array ${currentPlayer}`);
      //Inserting correct picture based off current player
      targ = document.getElementById(targId);
      targ.classList = curIcon;
    //Check against Win Scenarios
      Object.keys(winS).forEach((win) => {
        if (
          currentPlayer.includes(winS[win][0]) &&
          currentPlayer.includes(winS[win][1]) &&
          currentPlayer.includes(winS[win][2])
        ) {
          console.log(`you won!`);

          //Enter win state
          //Currentplayer score ++
        }
      });
    }
  };
  board.addEventListener("click", gamePlay)

  resetBut.addEventListener("click", resetGame)
  
  
});

