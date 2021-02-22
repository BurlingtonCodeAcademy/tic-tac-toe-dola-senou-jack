// add event listner to the boxes 
// when player clicks it turns X and add it to an array
//then comp turns one card and add it to an array
let playerMoves =[];
let compMoves =[];
let targId;
let board = document.getElementById("board");
let Xicon = `Xicon`;
let Oicon = `Oicon`;
let cellName;
let randNum;
board.addEventListener('click', (elmnt) =>{

    targId = elmnt.target.id;
    console.log(targId)
    if (
        !playerMoves.includes(targId) &&
        !compMoves.includes(targId) &&
        targId !== "board"
        ){
            playerMoves.push(targId);
            console.log(playerMoves)
            targ = document.getElementById(targId);
            targ.classList.add(Xicon);
        }
///comp
randNum = Math.floor((Math.random() * 7) + 1);
cellName =`cell-${randNum}`
if (playerMoves.includes(cellName) ||
compMoves.includes(cellName) 
){
    randNum =0;
while(randNum<=7){
    randNum++
    cellName =`cell-${randNum}`
}
}


if (
    !playerMoves.includes(cellName) &&
    !compMoves.includes(cellName) 
    ){
    compMoves.push(cellName);
    targ = document.getElementById(`${cellName}`);
    targ.classList.add(Oicon);

    }
     // blocking player from chossing an existing cell
  else if (
    playerOneMoves.includes(targId) ||
    playerTwoMoves.includes(targId) ||
    targId === "board"
  ) {
    alert(`please choose an empty cell`);
  }

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
        alert(`${playerOneName} Won!!!`);
        resetBoard();
        playerOneScore.innerText = playerOneScoreJs;
      } else if (currentPlayer === playerTwoMoves) {
        playerTwoScoreJs = playerTwoScoreJs + 1;
        alert(`${playerTwoName} Won!!!`);
        resetBoard();
        playerTwoScore.innerText = playerTwoScoreJs;
      }

      //Enter win state
      //Currentplayer score ++
    }
  });

    }
