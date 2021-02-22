
let openGame = document.getElementById("open");
let targetMode;
let vPlayerUrl = 'pvp.html';
let vCompUrl = `vComp.html`;
let vPlayerBut = document.getElementById("vsPlayer");
let vCompBut = document.getElementById("vsComp");
let inputOne = document.getElementById("playerOneName");
let inputTwo = document.getElementById("playerTwoName");
let oneReq = inputOne.required;
let goOn = false;
let playerNames = "";
// disable name two if vs comp was chosen
function nameTwoDis(){
    inputTwo.disabled = true;
    inputTwo.value =''
    inputTwo.placeholder = 'Computer'
    inputTwo.style.opacity= "50%"
}
//enable player two for pvp
function nameTwoEnb(){
    inputTwo.disabled = false;
    inputTwo.placeholder = 'Player two Name'
    inputTwo.style.opacity= "100%"
}

//disables name two
vCompBut.addEventListener('change',nameTwoDis)
// enables name two
vPlayerBut.addEventListener('change',nameTwoEnb)
// button to start the game
openGame.addEventListener("click", (event) => {
  
  // check which game mode checked
  if (vPlayerBut.checked) {
    console.log('1')
    //   check if player entered both players name
    if (inputOne.value === "" || inputTwo.value === "") {
      alert(`Please enter name for each player!`);
    } else {
      console.log('2')
      goOn = true;
      playerNames= inputOne.value +'-'+ inputTwo.value
      targetMode = vPlayerUrl;
    }
    // comp game requirements 
  } else if (vCompBut.checked) {
    
      //   check if player entered his name
    if (inputOne.value === "") {
      alert(`Please enter your name`);
    } else {
      goOn = true;
      playerNames= inputOne.value
      targetMode = vCompUrl;
    }
  }
  //alert no mode was checked
  else {
    alert(`Please choose a game mode`);
  }

  // opens the game mode only if a mode was checked
  
      if ((vPlayerBut.checked || vCompBut.checked) && goOn===true) {
        window.location.assign(`http://localhost:5500/${targetMode}?${playerNames}`);
  }
});