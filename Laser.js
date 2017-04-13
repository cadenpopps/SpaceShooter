function Laser(_x, _y, _shooter) {

    this.x = _x;
    this.y = _y;
    this.prevY;
    this.size = 15;
    this.shooter = _shooter;
    this.alive = true;

    console.log(this);

    this.update = function() {
        console.log("up");
        if (this.shooter == 0) {
            this.y -= 10;
        }

        for (let e of enemies) {
            if (abs(this.x - e.x) + abs(this.y - e.y) < this.size + e.size) {
                if (dist(this.x, this.y, e.x, e.y) < this.size / 2 + e.size / 2) {
                    e.active = false;
                    this.alive = false;
                }
            }
        }

        if (this.y > height || this.y < 0) {
            this.alive = false;
        }
    };

    this.display = function() {
        fill(255, 0, 0);
        strokeWeight(this.size);
        stroke(255, 0, 0);
        line(this.x, this.y, this.x, this.y + this.size);
        noStroke();
    };

}