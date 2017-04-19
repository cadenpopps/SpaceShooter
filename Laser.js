function Laser(_x, _y, _shooter) {

    var x = _x;
    var y = _y;
    var prevY;
    var size = 15;
    var shooter = _shooter;
    var alive = true;

    this.getX = function() {
        return x;
    };

    this.getY = function() {
        return y;
    };

    this.getSize = function() {
        return size;
    };

    this.alive = function() {
        return alive;
    }

    this.update = function() {
        if (shooter == 0) {
            y -= 10;
        }

        if (y > height || y < 0) {
            alive = false;
        }
    };

    this.destroy = function(collidedWith) {

        if (abs(x - collidedWith.getX()) + abs(y - collidedWith.getY()) < size + collidedWith.getSize()) {
            alive = false;
        }

    };

    this.display = function() {
        //fill(255, 0, 0);
        strokeWeight(size);
        stroke(255, 0, 0);
        line(x, y, x, y + size);
        noStroke();
    };

}