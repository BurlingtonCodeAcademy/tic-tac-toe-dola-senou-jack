let tardId;
let targ
let board = document.getElementById("board");
// target the clicked image and getting it's Id
board.addEventListener('click',(elmt) => {
    console.log(`this is the ${elmt.target.id}`)
targId = elmt.target.id;
targ = document.getElementById(targId)
console.log(targ)
// if statment to determine the player
targ.innerHTML = '<img href="" alt="icon"/>'
    
})