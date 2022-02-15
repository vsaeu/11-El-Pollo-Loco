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

}