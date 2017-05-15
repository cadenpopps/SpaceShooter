function Enemy() {

	const size = ENEMYSIZE;
	var moveSpeed = 10;
	var alive = false;
	var moveSide = true;

	var target = createVector();
	var pos = createVector();
	var vel = createVector();
	var acc = createVector();

	// this.color = [];

	this.getX = function() {
		return pos.x;
	};

	this.getY = function() {
		return pos.y;
	};

	this.getSize = function() {
		return size;
	};

	this.getAlive = function() {
		return alive;
	};

	this.reset = function(_x, _y) {
		if (!alive) {
			pos.x = _x * enemyScaleX + 30;
			pos.y = _y * enemyScaleY;
			alive = true;
			moveSide = true;
		}
	};

	this.update = function() {
		if (moveSide) {
			if (frameCount % 120 < 30 || frameCount % 120 >= 90) {
				pos.x++;
				// x += (random(.5, 1.5));
			}
			else {
				pos.x--;
				// x -= (random(.5, 1.5));
			}
		}
		else {

			vel.mult(.95);

			var attract = createVector(target.x, target.y);

			attract.sub(pos);
			pos.add(vel);
			vel.add(acc);
			// vel.x = constrain(vel.x, 0, 20);
			// vel.y = constrain(vel.y, 0, 20);

			acc = attract.mult(.001);

			if (dist(pos.x, pos.y, target.x, target.y) < 2) {
				moveSide = true;
				target = createVector();
				attract = createVector();
				vel = createVector();
				acc = createVector();
			}
		}

		this.checkCollisions();
	};

	this.checkCollisions = function() {
		for (let l of lasers) {
			if (abs(pos.x - l.getX()) + abs(pos.y - l.getY()) < size + l.getSize()) {
				if (dist(pos.x, pos.y, l.getX(), l.getY()) < size / 2 + l.getSize() / 2) {
					l.destroy(this);
					alive = false;
				}
			}
		}
	};

	this.moveTo = function(_x, _y) {
		moveSide = false;
		target = createVector(_x, _y);
	};

	this.destroy = function() {
		if (abs(pos.x - player.getX()) + abs(pos.y - player.getY()) < size + player.getSize()) {
			alive = false;
		}
	};

	this.display = function() {
		if (alive) {
			// fill(this.color[0], this.color[1], this.color[2]);
			// fill(200, 230, 210);
			// ellipse(pos.x, pos.y, size, size);
			image(enemyTexture, pos.x - 64, pos.y - 64);
		}
	};

}