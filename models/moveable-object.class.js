class MoveableObject extends DrawableObjects {

    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisionJustHappend = false;
    collectedCoins = 0;
    collectedBottles = 4;



    // character.isColliding (chciken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    isJumpingOn(mo) {
        return this.y + this.height == mo.y;
    }

    collected(item) {
        if (item == 'coin') {
            return this.collectedCoins;
        }
        if (item == 'bottle') {
            return this.collectedBottles;
        }
    }

    collect(item) {
        if (item == 'coin') {
            this.collectedCoins += 1;
        }
        if (item == 'bottle') {
            this.collectedBottles += 1;
        }
    }

    lasthitTime = 0;

    hit(enemy) {

        let hitTime = new Date().getTime();
        let timeDiff = (hitTime - this.lasthitTime)
        // console.log('Zeitunterschied Hit: ', timeDiff);
        this.lasthitTime = hitTime;

        let hitCounter = 1;
        // console.log(hitCounter);
        hitCounter++;

        if (!this.isHurt() && enemy instanceof Endboss) {
            this.endbossHit_Sound.play();
            this.lastHit = new Date().getTime(); // timestamp hit, isHurt true für 500 ms
            this.energy -= 40;
            // console.log('Energie: ', this.energy);



        }
        if (this.energy < 0 && enemy instanceof Endboss) {
            // console.log('unerwünschter trigger');
            enemy.EndbossStatus = 'dead';
        }
        else if (this.energy > 0 && enemy instanceof Endboss && this.isHurt()) {
            enemy.EndbossStatus = 'hit';
            setTimeout(() => {
                enemy.EndbossStatus = 'normal';

            }, 1000);
        }


        // this.collisionJustHappend = true;
        // if (this.energy < 0) {
        //     this.energy = 0;
        // } else {
        //     this.lastHit = new Date().getTime();
        // }
        // setTimeout(() => {
        //     this.collisionJustHappend = false;
        // }, 100);

    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Differenz in ms
        // let diese = this;
        // if (diese instanceof Endboss) {
        //     console.log('MO Time Diff Endboss isHurt()', timePassed < 500);
        // }
        return timePassed < 510;
    }

    endbossIsHurt() {
        // console.log('MO endbossIsHurt(), return Wert: ', this.collisionJustHappend)
        return this.collisionJustHappend;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;

    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    // ebImgHit = [
    //     'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
    //     'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
    //     'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
    // ];

    playAnimation(images) {
        if (this.energy < 0 && this instanceof Endboss) {
            this.playDeadAnimation(images);

        }
        else {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    };

    deadAnimationCounter = 0;

    playDeadAnimation(images) {
        if (this.deadAnimationCounter < images.length){
            let i = this.deadAnimationCounter;
            console.log('Nummer des Dead Bildes: ', i)
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.deadAnimationCounter++;
        }
        // if (deadAnimationCounter ==  images.length)
        // {

        // }

    }

    applyGravaty() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 185
    }

    jump() {
        this.speedY = 30;
    }

    jumpOnChicken() {
        this.speedY = 20;
    }
}

