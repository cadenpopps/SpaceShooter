function Star() {

    this.x;
    this.y;
    this.size;

    this.reset = function() {
        this.x = random(width);
        this.y = -20;
        this.size = random(2, 10);
        this.velY = this.size;
    };

    this.update = function() {
        this.y += this.velY;
        if (this.y > height + 20) {
            this.reset();
        }
    };

    this.display = function() {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    };

}