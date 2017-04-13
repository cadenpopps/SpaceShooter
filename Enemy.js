function Enemy() {

    this.size = 50;
    this.active = false;

    this.reset = function(_x, _y) {
        this.x = _x * enemyScaleX + 30;
        this.y = _y * enemyScaleY;
        this.active = true;
        this.moveSide = true;
    };

    this.update = function() {
        if (this.moveSide) {
            if (frameCount % 120 < 30) {
                this.x++;
                // this.x += (random(.5, 1.5));
            }
            else if (frameCount % 120 > 90) {
                this.x++;
                // this.x += (random(.5, 1.5));
            }
            else {
                this.x--;
                // this.x -= (random(.5, 1.5));
            }
        }
    };

    this.display = function() {
        fill(200, 255, 200);
        ellipse(this.x, this.y, this.size, this.size);
    };

}