class backgroundObject extends MoveableObject {
    y=30;
    height= 480;
    width = 720;

    constructor(img, x){
        super().loadImage(img);
        this.x = x;
        this.y = 480 - this.height;
        }
}