function Player() {

    const MOVESPEED = 10;
    const size = 50;
    x = width / 2;
    y = height - size;
    var alive = true;
    var shootCoolDown = 0;

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
    };

    this.update = function() {

        if (keyIsDown(68) && x < width - size) {
            x += MOVESPEED;

        }
        if (keyIsDown(65) && x > size) {
            x -= MOVESPEED;
        }

        if (shootCoolDown > 0) {
            shootCoolDown--;
        }

        checkCollisions();
    };

    var checkCollisions = function() {
        for (let l of lasers) {
            if (abs(x - l.getX()) + abs(y - l.getY()) < size + l.getSize()) {
                if (dist(x, y, l.getX(), l.getY()) < size / 2 + l.getSize() / 2) {
                    l.destroy(this);
                    active = false;
                }
            }
        }
        for (let e of enemies) {
            if (abs(x - e.getX()) + abs(y - e.getY()) < size + e.getSize()) {
                if (dist(x, y, e.getX(), e.getY()) < size / 2 + e.getSize() / 2) {
                    console.log("test");
                    e.destroy();
                    alive = false;
                }
            }
        }
    };

    this.destroy = function() {
        alive = false;
    };

    this.fire = function() {
        if (shootCoolDown <= 0 && alive) {
            lasers.push(new Laser(x, y - size, 0));
            shootCoolDown = 12;
        }
    };

    this.display = function() {
        fill(255, 100, 120);
        ellipse(x, y, size, size);
    };
}
