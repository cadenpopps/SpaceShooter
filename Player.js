function Player() {

	const MOVESPEED = 1;
	const size = 96;
	const DIAGMOVESPEED = MOVESPEED / 2 * 1.4142135623746;
	const MAXSPEED = 10;
	const ROTATESPEED = .1;
	var pos = createVector(width / 2, height - size);
	var vel = createVector();
	var acc = createVector();
	var heading = 0;
	var hitbox = [];
	hitbox.push(new Hitbox(pos.x - 24, pos.y - 96, 48, 96, pos.x, pos.y));
	hitbox.push(new Hitbox(pos.x - 52, pos.y - 24, 104, 128, pos.x, pos.y));
	var alive = true;
	var shootCoolDown = 0;

	this.getX = function() {
		return pos.x;
	};

	this.getY = function() {
		return pos.y;
	};

	this.getSize = function() {
		return size;
	};

	this.alive = function() {
		return alive;
	};

	this.update = function() {
		vel.mult(.98);

		if (keyIsDown(RIGHT)) {
			heading += ROTATESPEED;
		}
		else if (keyIsDown(LEFT)) {
			heading -= ROTATESPEED;
		}
		if (keyIsDown(UP)) {
			var force = p5.Vector.fromAngle(heading - (PI / 2));
			force.mult(0.5);
			vel.add(force);
		}
		else if (keyIsDown(DOWN)) {
			var force = p5.Vector.fromAngle(heading + (PI / 2));
			force.mult(0.5);
			vel.add(force);
		}

		pos.add(vel);
		vel.limit(MAXSPEED);

		if (pos.x < -size) {
			pos.x = width + size;
		}
		else if (pos.x > width + size) {
			pos.x = -size;
		}
		if (pos.y < -size) {
			pos.y = height + size;
		}
		else if (pos.y > height + size) {
			pos.y = -size;
		}

		if (shootCoolDown > 0) {
			shootCoolDown--;
		}

		for (let h of hitbox) {
			h.update(pos.x, pos.y, heading);
		}

		// checkCollisions();
	};

	var checkCollisions = function() {
		for (let l of lasers) {
			if (abs(pos.x - l.getX()) + abs(pos.y - l.getY()) < size + l.getSize()) {
				if (dist(pos.x, pos.y, l.getX(), l.getY()) < size / 2 + l.getSize() / 2) {
					l.destroy(this);
					active = false;
				}
			}
		}
		for (let e of enemies) {
			if (abs(pos.x - e.getX()) + abs(pos.y - e.getY()) < size + e.getSize()) {
				if (dist(pos.x, pos.y, e.getX(), e.getY()) < size / 2 + e.getSize() / 2) {
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
			lasers.push(new Laser(pos.x, pos.y - size, 0));
			shootCoolDown = 12;
		}
	};

	this.display = function() {
		fill(255, 100, 120);
		// ellipse(x, y, size, size);

		rectMode(CORNERS);

		for (let h of hitbox) {
			rect(h.x1, h.y1, h.x2, h.y2);
		}

		push();
		translate(pos.x, pos.y + 10);
		rotate(heading);
		image(playerTexture, -96, -96);
		pop();
	};
}
