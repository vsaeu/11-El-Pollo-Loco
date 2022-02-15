class DrawableObjects {

    x = 120;
    y = 280;
    img;
    imageCache = [];
    currentImage = 0;
    height = 150;
    width = 100;
    otherDirection = false;

    drawMO(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElmenetById('ImgId') <img id="ImgId">
        this.img.src = path;
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "green";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ....] 
     */
     loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}