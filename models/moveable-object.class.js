class MoveableObject extends DrawableObjects {

    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    numberOfColissions = 0;
    collectedCoins = 0;


    // character.isColliding (chciken)
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    collected() {
        return this.collectedCoins;
    }

    collect(coin) {

        this.collectedCoins += 1;
        // coin.hide();

        setTimeout(() => {
            
        }, 10);
        console.log('collected Coins', this.collectedCoins);
    }

    hide() {
        this.width = 0;
        this.height = 0;
        this.x = 10000;
    }


    hit() {

        this.energy -= 3;
        this.numberOfColissions += 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //Differenz in ms

        return timePassed < 500;
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
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

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
}

