let targId ;
let targ;
let Xicon = `Xicon`;
let Oicon = `Oicon`;
let board = document.getElementById("board");
let count =0;

let currentPlayer = [];
let playerSwitch = true;
let curIcon;
let playerOneMoves = [];
let playerTwoMoves = [];

// function to switch turns
// function to change player icon
function playerTurn() {
  if (playerSwitch === true) {
    currentPlayer = playerOneMoves;
    playerSwitch = !playerSwitch;
    curIcon = Xicon;

  } else if (playerSwitch !== true) {
    currentPlayer = playerTwoMoves;
    playerSwitch = !playerSwitch;
    curIcon = Oicon;
  }
}

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

// target the clicked image and getting it's Id
board.addEventListener("click", (elmt) => {
  
  
  console.log(targId)
  console.log(currentPlayer.includes(targId))
  
  console.log(`player1 array ${playerOneMoves}`);
  console.log(`player2 array ${playerTwoMoves}`);
  console.log(`player array ${currentPlayer}`);
  if (!playerOneMoves.includes(targId) && !playerTwoMoves.includes(targId)){
    currentPlayer.push(targId);
    targId = elmt.target.id;
   
    playerTurn();

   
    console.log(`player1 array ${playerOneMoves}`);
    console.log(`player2 array ${playerTwoMoves}`);
    console.log(`player array ${currentPlayer}`);
    targ = document.getElementById(targId);

    //   console.log(targ);

    targ.classList = curIcon

    Object.keys(winS).forEach((win) => {
      if (
        currentPlayer.includes(winS[win][0]) &&
        currentPlayer.includes(winS[win][1]) &&
        currentPlayer.includes(winS[win][2])
      ) {
        console.log(`you won!`);
      }
    });
  }
});
