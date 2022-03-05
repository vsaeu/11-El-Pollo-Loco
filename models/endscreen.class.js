class Endscreen extends DrawableObjects {

    x = 0;
    y = 0;
    width;
    height;

    gameOver_SOUND = new Audio('audio/gameOver.mp3');
    lost_SOUND = new Audio('audio/pepeDead.mp3');


    IMAGES = [
     "img/9.Intro _ Outro Image/_Game over_ screen/4.Game over!.png",
     "img/9.Intro _ Outro Image/_Game over_ screen/2.oh no you lost!.png"
    ];

    constructor(canvas) {
        super();
        this.loadImages(this.IMAGES);
        this.width = canvas.width;
        this.height = canvas.height;
    }

    gameOver() {
        // this.img.src = ;
        this.gameOver_SOUND.play();
        this.img = this.imageCache[this.IMAGES[0]];
        // this.img.src = this.IMAGES['gameOver'];f
    }

    lost() {
        this.lost_SOUND.play();
        this.img = this.imageCache[this.IMAGES[1]];
    }


}