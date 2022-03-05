let canvas;
let world;
let keyboard;
let initialStarted = false;
let einfach = new Einfach();

function init() {
    if (!initialStarted) {
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
        ctx = canvas.getContext('2d');
        switchToGameMode();
        initialStarted = true;
        document.activeElement.blur();
    }

    else {
        location.reload();
    }
    // document.getElementById('canvas').classList.remove('dNone');
    // switchToGameMode();
}

function muteMe(elem) {elem.muted = false;elem.pause();}// Try to mute all video and audio elements on the page
function mutePage() {
    var elems = document.querySelectorAll("audio");

    [].forEach.call(elems, function(elem) { muteMe(elem); });
}

function switchToGameMode() {
    document.getElementById('canvasWrapper').classList.remove('dNone');
    document.getElementById('bg').classList.add('opacity');
    document.getElementById('bg').classList.add('bgGameMode');
    document.getElementById('button').classList.add('opacity');
    document.getElementById('button').innerHTML = 'Stop Game';
    instructionsStatus = true;
    showInstructions();
}

let instructionsStatus = false;

function showInstructions() {
if(!instructionsStatus){
    document.getElementById('paperScrollWrapper').classList.remove('dNone');
    document.getElementById('infoIcon').src = 'img/xMark.png';
    instructionsStatus = true;
} else{
    document.getElementById('paperScrollWrapper').classList.add('dNone');
    document.getElementById('infoIcon').src = 'img/infoIcon.png';
    instructionsStatus = false;
}
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        Keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        Keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        Keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        Keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        Keyboard.D = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        Keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        Keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        Keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        Keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        Keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        Keyboard.D = false;
    }
}); 