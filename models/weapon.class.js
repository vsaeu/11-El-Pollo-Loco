class Weapon extends MoveableObject {
    y =350 ; 
    height = 70;
    width = 70;
    x = 200;
    accX=0;
    accY=0;
    speedX=0;
    speedY=0;

  constructor(x) {
        super().loadImage('img/6.botella/2.Botella_enterrada2.png');
        this.x = x + Math.random() * 400; // Zahl zwischen 200-700
    }

}