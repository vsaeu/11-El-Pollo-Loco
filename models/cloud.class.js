class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;
speed = 0.15;
    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.x = 0 + Math.random() * 500; // Zahl zwischen 200-700
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }


}