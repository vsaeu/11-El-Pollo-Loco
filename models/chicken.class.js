class Chicken extends MoveableObject {
    y = 337 + 20;
    height = 75;
    width = 50;
    speed = 1.15 + Math.random() * 5;
    x = 200;
    isDeadStatus = false;
    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
    ];

    IMAGE_DEAD = 'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png';
    chickenDie_sound = new Audio('audio/chicken.mp3');



    constructor(x) {
        //super() wenn methode aus Übergeornetem Objekt genomen werden soll
        super().loadImage(this.IMAGE_DEAD);
        this.x = x + 200 + Math.random() * 100; // Zahl zwischen 200-700
        this.animate();
        this.loadImages(this.IMAGES_WALKING);

    }

    isDeadChicken() {
        if (this instanceof Chicken) {
            this.img.src = this.IMAGE_DEAD;
            this.isDeadStatus = true;
            this.animate();
            this.playSound();
        }
    }

    playSound() {
        this.chickenDie_sound.volume = 0.3;
        this.chickenDie_sound.play();
    }

    animate() {
        let intervalAnimation = setInterval(() => {
            if (this.isDeadStatus) {
                clearInterval(intervalAnimation);
            }
            else {
                this.moveLeft();
                this.otherDirection = false;
                this.x -= this.speed;
                this.playAnimation(this.IMAGES_WALKING);
            }


        }, 10000 / 60);

    }

}

