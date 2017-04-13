var player;
var enemies;
var lasers = [];
var stars;
const ENEMYAMOUNT = 30;
const STARAMOUNT = 20;
var enemyScaleX;
var enemyScaleY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    enemyScaleX = (width - 200) / (ENEMYAMOUNT / (ENEMYAMOUNT / 10));
    enemyScaleY = (height / 3) / (ENEMYAMOUNT / 10);
    enemies = new Array(ENEMYAMOUNT);
    stars = new Array(STARAMOUNT);
    for (var i = 0; i < ENEMYAMOUNT; i++) {
        enemies[i] = new Enemy();
    }
    for (var i = 0; i < STARAMOUNT; i++) {
        stars[i] = new Star();
        stars[i].reset();
    }

    setInterval(update, 25);
    init();
}

function draw() {

    background(30);

    player.display();

    for (let s of stars) {
        s.display();
    }

    for (let e of enemies) {
        if (e.active) {
            e.display();
        }
    }

    for (let l of lasers) {
        l.display();
    }


    //fill(255);
    //rect(width / 2 - 1, 0, 2, height);
}

function update() {
    if (player.alive) {
        player.update();
        for (let e of enemies) {
            if (e.active) {
                e.update();
            }
        }
        for (var i = enemies.length - 1; i >= 0; i--) {
            if (!enemies[i].active) {
                enemies.splice(i, 1);
            }
        }
        for (let l of lasers) {
            l.update();
        }
        for (var i = lasers.length - 1; i >= 0; i--) {
            if (!lasers[i].alive) {
                lasers.splice(i, 1);
            }
        }
        for (let s of stars) {
            s.update();
        }
    }
}


function init() {

    player = new Player();

    var enemyY = 1;
    for (var i = 0; i < ENEMYAMOUNT; i++) {
        enemies[i].reset(i % 10 + 1, enemyY);
        if (i % 10 == 9) {
            enemyY++;
        }
    }

}

function keyTyped() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
