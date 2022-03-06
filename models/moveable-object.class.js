class MoveableObject extends DrawableObjects {

    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    collisionJustHappend = false;
    collectedCoins = 0;
    collectedBottles = 0;

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

    hit(enemy) {
        if (!this.isHurt() && enemy instanceof Endboss) {
            this.endbossHitByBottle();
        }
        if (this.energy < 0 && enemy instanceof Endboss) {
            enemy.EndbossStatus = 'dead';
        }
        else if (this.energy > 0 && enemy instanceof Endboss && this.isHurt()) {
            enemy.EndbossStatus = 'hit';
            this.endbossAttackStatus(enemy);
        }
    }

    endbossHitByBottle() {
        this.endbossHit_Sound.play();
        this.lastHit = new Date().getTime(); // timestamp hit, isHurt true für 500 ms
        this.energy -= 40;
    }

    endbossAttackStatus(enemy) {
        setTimeout(() => {
            enemy.EndbossStatus = 'attack';
        }, 1000);
        setTimeout(() => {
            enemy.speed = 70;
        }, 1800);
        setTimeout(() => {
            enemy.EndbossStatus = 'normal';
            enemy.speed = 4;
        }, 2500);
    }

    pepeGotHit() {
        this.energy -= 2;
        this.lastHit = new Date().getTime();
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Differenz in ms
        return timePassed < 510;
    }

    endbossIsHurt() {
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
        if (this.deadAnimationCounter < images.length) {
            let i = this.deadAnimationCounter;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.deadAnimationCounter++;
        }
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

