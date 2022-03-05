class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    weapon;
    level_end_x = 4000;
    


    constructor(enemies, clouds, backgroundObjects, coins, weapon) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.weapon = weapon;
        // this.Object ist gleich neues Oblect, Rest sind parameter die reinkommen
    }

    coin_sound = new Audio('audio/glass.mp3');
    glass_sound = new Audio('audio/glassNew.mp3');

    playSoundCoin() {
        this.coin_sound.play();
    }

    playSoundGlass() {
        this.glass_sound.play();
    }

}