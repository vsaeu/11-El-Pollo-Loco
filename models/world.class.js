class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    camera_x = 0;
    keyboard = new Keyboard();
    statusBar = new StatusBar();
    statusBarCoins = new StatusBarCoins();
    statusBarWeapon = new StatusBarWeapon();
    flyingBottle = [];
    loopPlaySound = new Audio('audio/playLoopSound.mp3');
    startChickenSound = new Audio('audio/startChicken.mp3');
    endboss = this.level.enemies[0];
    endscreen = new Endscreen(canvas);
    gameGoing = true;


    // coin = new Coin();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkThrowObjects();
        this.playLoopSound();
    }

    playLoopSound() {
        this.loopPlaySound.loop = true;
        this.loopPlaySound.volume = 0.5;
        this.loopPlaySound.play();
        this.startChickenSound.play();
    }

    setWorld() {
        this.character.world = this;
    }

    checkThrowObjects() {
        setInterval(() => {
            if (Keyboard.D) {
                let x;
                let direction;
                if (this.character.otherDirection) {
                    x = this.character.x - 30;
                    direction = 'left';
                }
                else {
                    x = this.character.x + this.character.width - 30;
                    direction = 'right';
                }
                let y = this.character.y + 50;
                let initialSpeedX = 0;
                if (this.character.movingStatus) {
                    initialSpeedX = this.character.speed;
                }
                if (this.character.collectedBottles > 0) {
                    let bottle = new Throwable(x, y, direction, initialSpeedX);
                    this.flyingBottle.push(bottle);
                    this.character.collectedBottles -= 1;
                    this.statusBarWeapon.setPercentage(this.character.collectedBottles);
                }
            }
        }, 130);
    }

    checkCollisionCharacterWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.speedY == 0 && !enemy.isDeadStatus && enemy instanceof Chicken) {
                enemy.isDeadChicken();
                this.character.jumpOnChicken();
            }
            
            else if (this.character.isColliding(enemy) && !enemy.isDeadStatus) {
                this.character.pepeGotHit();
                this.statusBar.setPercentage(this.character.energy);
            }


        });
        // console.log('character X: ', this.character.x);
    }

    checkCollisionWithCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.character.collect('coin');
                this.level.playSoundCoin();
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.character.collectedCoins);
            }
        });
    }

    checkCollisionWithBottle() {
        this.level.weapon.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.weapon.splice(index, 1);
                this.character.collect('bottle');
                this.level.playSoundGlass();
                this.statusBarWeapon.setPercentage(this.character.collectedBottles);
            }
        });
    }

    checkCollisionBottleWithEnemy() {
        this.level.enemies.forEach(enemy => {
            this.flyingBottle.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    bottle.collided = true;
                    this.checkCollisionBottleWithEndboss(enemy);
                    this.removeSplashedBottle();
                    if (enemy instanceof Chicken) {
                        enemy.isDeadChicken();
                    }
                }
            });
        });
    }

    checkCollisionBottleWithEndboss(enemy) {
        // if (!enemy.isHurt()) {
        //     enemy.hit(enemy); // Abzug Energy
        // }
        // else if (enemy.endbossIsHurt()) {
        enemy.hit(enemy);
        this.removeSplashedBottle();
        // }
    }

    removeSplashedBottle() {
        setTimeout(() => {
            this.flyingBottle.splice(0, 1);
        }, 500);
    }

    checkCollisions() {
        setInterval(() => {
            this.checkCollisionCharacterWithEnemy();
            this.checkCollisionWithCoin();
            this.checkCollisionWithBottle();
            this.checkCollisionBottleWithEnemy();
        }, 70);
    }
    // }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0); // Kamera wird verschoben
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.weapon);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.flyingBottle);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0); // Kamera wird zurück geschoben
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarWeapon);
        this.nextDraw();
    }

    customTimeoutFinished = false;

    nextDraw() {
        if (this.endboss.EndbossStatus == 'dead' && this.customTimeoutFinished) {

            this.endscreen.gameOver();
            this.endGame();


        }
        else if (this.character.energy == 0) {
            this.endscreen.lost();
            this.endGame();
        }
        else {
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            }
            );
            this.customTimeout();
        }
       
    }

    customTimeout() {
        if (this.endboss.EndbossStatus == 'dead') {
            setTimeout(() => {
                this.customTimeoutFinished=true;
            }, 1500);
                    }
    }


    endGame() {
        this.gameGoing = false;
        this.loopPlaySound.pause();
        this.addToMap(this.endscreen);
        setTimeout(() => {
            location.reload();
        }, 5000);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {

        if (mo.otherDirection) {
            this.flipImage(mo);

        };
        mo.drawMO(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        };
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}