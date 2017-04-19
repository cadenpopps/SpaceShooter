function Enemy() {

    var x;
    var y;
    var size = 50;
    var moveSpeed = 10;
    var alive = false;
    var moveSide = true;

    this.getX = function() {
        return x;
    };

    this.getY = function() {
        return y;
    };

    this.getSize = function() {
        return size;
    };

    this.getAlive = function() {
        return alive;
    };

    this.reset = function(_x, _y) {
        if (!alive) {
            x = _x * enemyScaleX + 30;
            y = _y * enemyScaleY;
            alive = true;
            moveSide = true;
        }
    };

    this.update = function() {
        if (moveSide) {
            if (frameCount % 120 < 30) {
                x++;
                // x += (random(.5, 1.5));
            }
            else if (frameCount % 120 > 90) {
                x++;
                // x += (random(.5, 1.5));
            }
            else {
                x--;
                // x -= (random(.5, 1.5));
            }
        }
        else {
            if (random(1) < .5) {
                x += moveSpeed * random(.8, 1);
                // x += (random(.5, 1.5));
            }
            else {
                x -= moveSpeed * random(.8, 1); // x -= (random(.5, 1.5));
            }
            y += moveSpeed;
        }

        if (random(1) < .001) {
            moveSide = false;
        }

        if (y > height + size) {
            y = -2 * size;
            moveSide = true;
        }

        this.checkCollisions();
    };

    this.checkCollisions = function() {
        for (let l of lasers) {
            if (abs(x - l.getX()) + abs(y - l.getY()) < size + l.getSize()) {
                if (dist(x, y, l.getX(), l.getY()) < size / 2 + l.getSize() / 2) {
                    l.destroy(this);
                    alive = false;
                }
            }
        }
    };

    this.destroy = function() {
        if (abs(x - player.getX()) + abs(y - player.getY()) < size + player.getSize()) {
            alive = false;
        }
    };

    this.display = function() {
        if (alive) {
            fill(200, 255, 200);
            ellipse(x, y, size, size);
        }
    };

}