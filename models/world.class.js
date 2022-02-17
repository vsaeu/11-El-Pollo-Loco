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


    // coin = new Coin();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.checkThrowObjects();
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
                let bottle = new Throwable(x, y, direction);

                if (this.character.collectedBottles > 0) {
                    this.flyingBottle.push(bottle);
                    this.character.collectedBottles -= 1;
                    console.log(this.character.collectedBottles);
                    this.statusBarWeapon.setPercentage(this.character.collectedBottles);
                }
            }
        }, 200);
    }

    checkCollisions() {
        setInterval(() => {
            // console.log('Collision is checking for:.... ', 'enemies');

            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.character.speedY == 0) {
                    this.character.jumpOnChicken();
                    enemy.isDead();
                }
                else if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);                }
            });

            this.level.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.character.collect('coin');
                    this.level.playSoundCoin();
                    this.level.coins.splice(index, 1);
                    this.statusBarCoins.setPercentage(this.character.collectedCoins);
                }
            });

            this.level.weapon.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.level.weapon.splice(index, 1);
                    this.character.collect('bottle');
                    this.level.playSoundGlass();

                    this.statusBarWeapon.setPercentage(this.character.collectedBottles);
                }
            });

            this.level.enemies.forEach(enemy => {
                this.flyingBottle.forEach(bottle => {
                    if (bottle.isColliding(enemy)) {
                     
                        bottle.collided = true;
                        setTimeout(() => {
                            this.flyingBottle.splice(0, 1);
                        }, 1000);
                        
                    }
                });
            });


        }, 100);
    }

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


        // draw() wird immer wieder neu aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        }
        );
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
        mo.drawFrame(this.ctx);

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