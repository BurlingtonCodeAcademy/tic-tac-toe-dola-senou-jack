// all varibles
let openGame = document.getElementById("open");
let targetMode;
let vPlayerUrl = "pvp.html";
let vCompUrl = `vComp.html`;
let vPlayerBut = document.getElementById("vsPlayer");
let vCompBut = document.getElementById("vsComp");
let inputOne = document.getElementById("playerOneName");
let inputTwo = document.getElementById("playerTwoName");
let oneReq = inputOne.required;
let goOn = false;
let playerNames = "";

//Function disables name two if vs comp was chosen
function nameTwoDis() {
  inputTwo.disabled = true;
  inputTwo.value = "";
  inputTwo.placeholder = "Computer";
  inputTwo.style.opacity = "50%";
}
//Function enables player two for pvp
function nameTwoEnb() {
  inputTwo.disabled = false;
  inputTwo.placeholder = "Player two Name";
  inputTwo.style.opacity = "100%";
}

//Disables name two
vCompBut.addEventListener("change", nameTwoDis);
//Enables name two
vPlayerBut.addEventListener("change", nameTwoEnb);
//Button to start the game
openGame.addEventListener("click", (event) => {
  // check which game mode checked
  if (vPlayerBut.checked) {
    console.log("1");
    //   check if player entered both players name
    if (inputOne.value === "" || inputTwo.value === "") {
      alert(`Please enter name for each player!`);
    } else {
      // if names are entered the names get passed through the url
      console.log("2");
      goOn = true;
      playerNames = inputOne.value + "-" + inputTwo.value;
      targetMode = vPlayerUrl;
    }
    // comp game requirements
  } else if (vCompBut.checked) {
    //   check if player entered his name
    if (inputOne.value === "") {
      alert(`Please enter your name`);
    } else {
       // if player name is entered the name get passed through the url
      goOn = true;
      playerNames = inputOne.value;
      targetMode = vCompUrl;
    }
  }
  //alert no mode was checked
  else {
    alert(`Please choose a game mode`);
  }

  // opens the game mode only if a mode was checked
  if ((vPlayerBut.checked || vCompBut.checked) && goOn === true) {
    window.location.assign(
      `/${targetMode}?${playerNames}`
    );
  }
});
