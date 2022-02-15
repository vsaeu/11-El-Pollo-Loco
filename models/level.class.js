class Level{
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 700;

    constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        // this.Object ist gleich neues Oblect, Rest sind parameter die reinkommen
    }

}