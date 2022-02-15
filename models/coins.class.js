class Coins extends MoveableObject {
    y = 70;
    height = 150;
    width = 150;
    speed = 1;
    x = 200;
    directionDown = true;



    constructor(x) {

        super().loadImage('img/8.Coin/Moneda1.png');
        this.x = x + Math.random() * 200; // Zahl zwischen 200-700
        this.animate();


    }

    animate() {

        // setInterval(() => {

        //     this.moveLeft();
        //     this.otherDirection = false;
        // }, 10000 / 60);

        setInterval(() => {
            if (this.directionDown) {
                this.y += this.speed;
                if (this.y > 80) {
                    this.directionDown = false;
                }
            }
            else if (!this.directionDown) {
                this.y -= this.speed;
                if (this.y < 20) {
                    this.directionDown = true;
                }
            }


        }, 1000 / 60);
    }

}