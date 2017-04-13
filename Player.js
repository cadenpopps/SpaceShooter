function Player() {

    this.size = 50;
    this.x = width / 2;
    this.y = height - this.size;
    this.moveSpeed = 10;
    this.alive = true;
    var shootCoolDown = 0;

    this.update = function() {

        if (keyIsDown(68) && this.x < width - this.size) {
            this.x += this.moveSpeed;

        }
        if (keyIsDown(65) && this.x > this.size) {
            this.x -= this.moveSpeed;
        }
        if (keyIsDown(32) && shootCoolDown == 0) {
            lasers.push(new Laser(this.x, this.y - this.size, 0));
            shootCoolDown = floor(random(8, 13));
        }
        if (shootCoolDown > 0) {
            shootCoolDown--;
        }
    };

    this.destroy = function() {

    };

    this.display = function() {
        fill(255, 100, 120);
        ellipse(this.x, this.y, this.size, this.size);
    };
}
