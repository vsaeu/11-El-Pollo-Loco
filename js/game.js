let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
    console.log('My Character is', world.character);
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
    console.log("Keydown Event: ", e);
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
}); 