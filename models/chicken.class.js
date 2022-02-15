class Chicken extends MoveableObject {
    y = 337 + 20;
    height = 75;
    width = 50;
    speed = 1.15 + Math.random() * 5;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];


    constructor() {
        //super() wenn methode aus Übergeornetem Objekt genomen werden soll
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200-700
        this.animate();
        this.loadImages(this.IMAGES_WALKING);

    }

    animate() {

        setInterval(() => {

            this.moveLeft();
            this.otherDirection = false;
        }, 10000 / 60);

       setInterval(() => {
            this.x -= this.speed;
            this.playAnimation(this.IMAGES_WALKING);
        }, 10000 / 60);
    }

}