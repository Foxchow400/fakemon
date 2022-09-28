// main.js

let savedGameExists = 0
let food = 2
let happiness = 20
let dirt = 100
let health = 10
let gameRunning = 0

// alias function to get DOM element by ID
function $(id) {
    return document.getElementById(id)
}

// start thread
function start() {
    titleScreen() // load title screen
}

function titleScreen() {
    const main = $("main")
    let contentStr = ""
    contentStr += "<section id='startMenu' class='grid-container'>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'></div>"
    if (savedGameExists) {
        contentStr += "<button id='menu_continue'class='grid-item'>Continue</button>"
    } else {
        contentStr += "<div class='grid-item'></div>"
    }
    contentStr += "<button id='menu_newGame' class='grid-item' onclick='newGame()'>New Game</button>"
    contentStr += "<button id='menu_options' class='grid-item'>Options</button>"
    contentStr += "</section>"
    main.innerHTML = contentStr
}

function newGame() {
    const main = $("main")
    gameRunning = 1
    let contentStr = ""
    contentStr += "<section id='topPanel' class='grid-container'>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div id='date' class='grid-item'>" + Date.now() + "</div>"
    contentStr += "<div id='health' class='grid-item'>Health: " + health + "</div>"
    contentStr += "<div id='food' class='grid-item'>Food: " + food + "</div>"
    contentStr += "<div id='happiness' class='grid-item'>Happiness: " + happiness + "</div>"
    contentStr += "<div id='dirt' class='grid-item'>Dirt: " + dirt + "</div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "<div class='grid-item'><img id='fakemon' src='https://i.kym-cdn.com/photos/images/original/002/055/000/00a.jpg'></div>"
    contentStr += "<div class='grid-item'></div>"
    contentStr += "</section>"
    contentStr += "<section id='bottomPanel' class='grid-container'>"
    contentStr += "<button id='menu_newGame' class='grid-item' onclick='feed()'>Feed</button>"
    contentStr += "<button id='menu_newGame' class='grid-item' onclick='play()'>Play</button>"
    contentStr += "<button id='menu_newGame' class='grid-item' onclick='clean()'>Clean</button>"
    contentStr += "</section>"
    main.innerHTML = contentStr
    savedGameExists = 1
    mainThread()
}

function mainThread() {
    if (gameRunning == 1) {
    const date = new Date();
    document.getElementById("date").innerHTML = date.toLocaleTimeString();
    food--
    dirt++
    if (food <= 0) { food = 0; happiness-- }
    if (dirt >= 100) { dirt = 100; happiness-- }
    if (happiness < 1) {
        happiness = 0
        health--
    }
    document.getElementById("food").innerHTML = "Food: " + food
    document.getElementById("happiness").innerHTML = "Happiness: " + happiness
    document.getElementById("dirt").innerHTML = "Dirt: " + dirt
    document.getElementById("health").innerHTML = "Health: " + health
    if (health < 1) { gameRunning = 0 }
    setTimeout(function() {mainThread()}, 1000);
    }
}

// function mainThread() {
//     console.log(Date.now())
//     if (gameRunning) { 
//         setTimeout(mainThread(),1000)
//     }
// }

function feed() {
    food++
    if (food > 100) { food = 100 }
    document.getElementById("food").innerHTML = "Food: " + food
}

function play() {
    happiness++
    if (happiness > 100) { happiness = 100 }
    document.getElementById("happiness").innerHTML = "Happiness: " + happiness
}

function clean() {
    dirt = 0
    document.getElementById("dirt").innerHTML = "Dirt: " + dirt
}

start() // start thread