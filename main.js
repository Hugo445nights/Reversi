let score;
let gameOver = false;

let currentPawnTile;
let pawnTiles = [];
let placeablePawnTiles = [];
let newPawn;
let pawnColor;
let pawnBorder;
let pawnID;

let playerPlaying = true; // true = joueur 1 et false = joueur 2
let scorePlayer1 = 0;
let scorePlayer2 = 0;

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 64; i++) {
        //<div id="0-63"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    setPawn();
}

function getFourFirstTiles(tileNb) {
    switch (tileNb) {
        case 1: return 27; break;
        case 2: return 28; break;
        case 3: return 35; break;
        case 4: return 36; break;
    }
}

function setRules() {

}

function setPawn() {

    let pawnWhite1 = document.createElement("img");
    pawnWhite1.style.backgroundColor = "white";
    pawnWhite1.style.border = "1px solid black";
    pawnWhite1.style.borderRadius = "50%";

    let num1 = getFourFirstTiles(1);
    currentPawnTile = document.getElementById(num1);
    currentPawnTile.appendChild(pawnWhite1);
    pawnTiles.push(currentPawnTile);

    let pawnWhite2 = document.createElement("img");
    pawnWhite2.style.backgroundColor = "white";
    pawnWhite2.style.border = "1px solid black";
    pawnWhite2.style.borderRadius = "50%";

    let num2 = getFourFirstTiles(4);
    currentPawnTile = document.getElementById(num2);
    currentPawnTile.appendChild(pawnWhite2);
    pawnTiles.push(currentPawnTile);

    let pawnBlack1 = document.createElement("img");
    pawnBlack1.style.backgroundColor = "black";
    pawnBlack1.style.borderRadius = "50%";

    let num3 = getFourFirstTiles(2);
    currentPawnTile = document.getElementById(num3);
    currentPawnTile.appendChild(pawnBlack1);
    pawnTiles.push(currentPawnTile);

    let pawnBlack2 = document.createElement("img");
    pawnBlack2.style.backgroundColor = "black";
    pawnBlack2.style.borderRadius = "50%";

    let num4 = getFourFirstTiles(3);
    currentPawnTile = document.getElementById(num4);
    currentPawnTile.appendChild(pawnBlack2);
    pawnTiles.push(currentPawnTile);

}

function selectTile() {

    placeableTiles();

    let isOccup = isOccupied(this);

    if (!isOccup) {
        addPawn(this);
        updateScore();
        swapPlayers();
    }

}

function placeableTiles() {
    for (let i = 0; i < pawnTiles.length; i++){
        // est occupée
        let a = isOccupied(pawnTiles[i]);
        // respecte les règles (pas encore codé)
        let rulesAreRespected = true;
        // affiche ou non
        if (!isOccupied && rulesAreRespected){
            displayPlaceableTile(pawnTiles[i]);
        }
    }
}

function displayPlaceableTile(tile){
    newGhostPawn = document.createElement("img");
    newGhostPawn.style.backgroundColor = "pink";
    newGhostPawn.style.border = "1px solid white";
    newGhostPawn.style.borderRadius = "50%";

    placeablePawnTiles.push(tile);
}

function isOccupied(clickedTile) {
    let occupied = false;
    for (let i = 0; i < pawnTiles.length; i++) {
        if (clickedTile == pawnTiles[i]) {
            occupied = true;
        }
    }
    return occupied;
}

function updateScore() {
    if (playerPlaying) {
        scorePlayer1++;
    }
    else {
        scorePlayer2++;
    }
    score = scorePlayer1.toString() + " | " + scorePlayer2.toString();
    document.getElementById("score").innerText = score;
}

function swapPlayers() {
    if (playerPlaying) {
        playerPlaying = false;
    }
    else {
        playerPlaying = true;
    }
}

function addPawn(clickedTile) {
    for (let i = 0; i < pawnTiles.length; i++) {
        if (!playerPlaying) {
            pawnColor = "white";
            pawnBorder = "1px solid black";
            pawnID = i;
        }
        else {
            pawnColor = "black";
            pawnBorder = "1px solid white";
            pawnID = i;
        }
    }
    newPawn = document.createElement("img");
    newPawn.style.backgroundColor = pawnColor;
    newPawn.style.border = pawnBorder;
    newPawn.style.borderRadius = "50%";

    clickedTile.appendChild(newPawn);
    pawnTiles.push(clickedTile);
}