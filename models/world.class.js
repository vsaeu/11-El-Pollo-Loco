class World {

    character = new Character();
    level = level1;
    ctx;
    canvas;
    camera_x = 0;
    keyboard = new Keyboard();
    statusBar = new StatusBar();
    // coin = new Coin();

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            // console.log('Collision is checking for:.... ', 'enemies');

            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    // console.log('is Colliding: ', enemy);
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
                else if (!this.character.isColliding(enemy)) {
                    // console.log('is not Colliding: ', !this.character.isColliding(enemy));
               }
            });
        }, 200 ); 
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Kamera wird verschoben
        this.addObjectsToMap(this.level.backgroundObjects);

        // this.addToMap(this.coin);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); // Kamera wird zurück geschoben
        this.addToMap(this.character);
        this.addToMap(this.statusBar);
        // this.ctx.translate(this.camera_x, 0);

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