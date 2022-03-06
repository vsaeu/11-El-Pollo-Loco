class Character extends MoveableObject {
    x = 100;
    y = 185;
    height = 250;
    width = 150;
    speed = 13;
    movingStatus = false;
    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    ouch_sound = new Audio('audio/ouch.mp3');

    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-31.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-32.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-33.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png',
    ];

    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png',
    ];

    IMAGES_IDLE = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png',
    ];

    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.applyGravaty();
    }


    animate() {
        let intervalMove = setInterval(() => {
            this.animateBasics(intervalMove);
        }, 1000 / 60);
        this.animateImages();
    }

    animateBasics(intervalMove) {
        this.walking_sound.pause();
        this.world.camera_x = -this.x + 100;
        this.checkIfDead(intervalMove);
        this.checkJump();
        this.checkMoving();
    }

    checkIfDead(intervalMove) {
        if (this.isDead()) {
            setTimeout(() => {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(intervalMove);
            }, 100);
        }
    }

    checkJump() {
        if (Keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping_sound.play();
        }
        else if (!this.isAboveGround()) {
            this.y = 185;
        }
    }

    checkMoving() {
        if (Keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.movingStatus = true;
            this.moveRight();
            this.walking_sound.play();
        } else if (Keyboard.LEFT && this.x > 0) {
            this.movingStatus = true;
            this.moveLeft();
            this.walking_sound.play();
        }
        else {
            this.movingStatus = false;
        }
    }

    timeTriggerOld = 0;
    timeBreak() {
        let timeTriggerNew = new Date().getTime();
        let timeDiff = timeTriggerNew - this.timeTriggerOld // immer positiv--> Sobald größer als X, dann true
        return timeDiff > 1000;

    }

    animateImages() {
        setInterval(() => {
            if (this.isHurt()) {
                this.pepeHurt();
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.pepeWalkingAndIdle();
            }
        }, 100);
    }

    pepeHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.timeBreak()) {
            this.ouch_sound.play();
            this.timeTriggerOld = new Date().getTime();
        }
    }

    pepeWalkingAndIdle() {
        if (Keyboard.RIGHT || Keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

}