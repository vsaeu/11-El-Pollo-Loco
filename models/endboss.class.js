class Endboss extends MoveableObject {

    y = -30;
    height = 500;
    width = 350;
    x = 3300;
    endbossHit_Sound = new Audio('audio/endbossHitSound.mp3');
    world;
    speed = 1.5;

    IMAGES_STANDING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png',
    ];

    IMAGES_ATTACKING = [
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png',
'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png',

    ];


    IMAGES_WALKING = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png',
    ];



    IMAGES_HIT = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png',
      ];

    IMAGES_DEAD = [
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
        'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_STANDING[0]);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_HIT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
    }

    intervalStanding = true;
    endbossIsDead = false;
    endbossJustHurted = false;

    // 0=Normal, 1=Hit, 2= Dead, 3=Attack
    EndbossStatus = 'normal';



    // animate() {
    //     if (!this.endbossIsDead && !this.endbossJustHurted) {
    //         setInterval(() => {
    //             if (this.intervalStanding) {
    //                 console.log('EB IMAGES_STANDING');
    //                 this.playAnimation(this.IMAGES_STANDING);
    //             }
    //         }, 10000 / 30);
    //     }
    // }

    animate(){
        setInterval(() => {
            if(this.EndbossStatus == 'normal'){
                this.playAnimation(this.IMAGES_STANDING);
                this.moveLeft();
                this.otherDirection = false;
                this.x -= this.speed;
            }
            if(this.EndbossStatus == 'hit'){
                this.playAnimation(this.IMAGES_HIT);
            }
            if(this.EndbossStatus == 'dead'){
                this.playAnimation(this.IMAGES_DEAD);
            }

        }, 300);
    }


 

    // endbossHit() {
    //     console.log('EB Animation endbossHit() wird getriggert');

    //     this.endbossHit_Sound.play();

    //     let interval = setInterval(() => {
    //         if (this.isDead() && this.counterDeadLoopPlay > 0) {
    //             this.intervalStanding = false;
    //             this.playAnimation(this.IMAGES_DEAD);
    //             this.endbossJustHurted = true;
    //             counterDeadLoopPlay--;
    //             console.log('EB this.playAnimation(this.IMAGES_DEAD);');
    //         }
    //         else if (this.counterHitLoopPlay> 0) {
    //             this.counterHitLoopPlay--;
    //             this.endbossJustHurted = true;

    //         }  else if (this.counterHitLoopPlay == 0){
    //             this.animate();
    //             clearInterval(interval);
    //         }
    

    //     }, 200);


    //     setTimeout(() => {
    //         this.endbossJustHurted = false;
    //         this.counterHitLoopPlay = 6;
    //     }, 1000);

    // }


}