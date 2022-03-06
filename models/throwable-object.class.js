class Throwable extends MoveableObject {

    direction = 'right';
    height = 70;
    width = 70;
    accX = 0.15;
    accY = 1.5;
    throwing_sound = new Audio('audio/throwing.mp3');
    splash_sound = new Audio('audio/splash.mp3');
    collided = false;
    initialSpeedX = 0;

    IMAGES_FLY = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png',
    ];

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',
    ];


    constructor(x, y, direction, initialSpeedX) {
        super().loadImage(this.IMAGES_FLY[1]);
        this.loadImages(this.IMAGES_FLY);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.initialSpeedX = initialSpeedX;
        this.flyingBottle();
        this.animate();
        this.throwing_sound.play();
    }


    animate() {
        let intervalFlyingBottle = setInterval(() => {
            if (this.collided || this.y > 350) {
                this.stopBottleAndCrack();
                setTimeout(() => {
                    clearInterval(intervalFlyingBottle);
                }, 500);
            }
            else {
                this.playAnimation(this.IMAGES_FLY);
                console.log('play animation fly');
            }
            this.collided = false
        }, 100);
    };

    isBottleAboveGround() {
        return this.y > 350;
    }

    stopBottleAndCrack() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.speedX = 0;
        this.speedY = 0;
        this.accX = 0;
        this.accY = 0;
        this.splash_sound.play();
    }

    removeSplash() {
        setTimeout(() => {
            this.splice(0, 1);
        }, 800);
    }

    flyingBottle() {
        if (this.direction == 'right') {
            this.speedX = 17 + this.initialSpeedX;
            this.speedY = -12;
            this.bottleFlight();
        }
        else {
            this.speedX = -17;
            this.speedY = -12;
            this.bottleFlight();
        }
    }

    bottleFlight(){
        setInterval(() => {
            this.x += this.speedX;
            this.speedX -= this.accX;
            this.y += this.speedY;
            this.speedY += this.accY;
        }, 1000 / 25);
    }

}

