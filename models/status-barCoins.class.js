class StatusBarCoins extends DrawableObjects {

    IMAGES = [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 260;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.otherDirection = false;
        this.setPercentage(0);
    }

    setPercentage(number) {
        let path = this.IMAGES[number];
        this.img = this.imageCache[path];
    }
}