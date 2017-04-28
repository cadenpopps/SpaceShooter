var player;
var enemies;
var lasers = [];
var stars;
const ENEMYAMOUNT = 30;
const SQUADAMOUNT = ENEMYAMOUNT / 3;
const STARAMOUNT = 40;
const ENEMYSIZE = 50;
var enemyScaleX;
var enemyScaleY;

function setup() {
    createCanvas(windowWidth, windowHeight);
    enemyScaleX = (width - 200) / (ENEMYAMOUNT / (ENEMYAMOUNT / 10));
    enemyScaleY = (height / 3) / (ENEMYAMOUNT / 10);
    enemies = new Array(ENEMYAMOUNT);
    squads = new Array(SQUADAMOUNT);
    stars = new Array(STARAMOUNT);
    for (var i = 0; i < ENEMYAMOUNT; i++) {
        enemies[i] = new Enemy();
    }
    for (var i = 0; i < SQUADAMOUNT; i++) {
        var children = new Array(3);
        children[0] = enemies[i];
        children[1] = enemies[i % SQUADAMOUNT + SQUADAMOUNT];
        children[2] = enemies[i % SQUADAMOUNT + SQUADAMOUNT + SQUADAMOUNT];
        squads[i] = new Squad(i, children);
    }
    for (var i = 0; i < STARAMOUNT; i++) {
        stars[i] = new Star();
    }

    init();
}

function draw() {

    background(30);
    noStroke();

    player.display();

    for (let s of stars) {
        s.display();
    }

    for (let e of enemies) {
        e.display();
    }

    for (let l of lasers) {
        l.display();
    }


    update();

    //fill(255);
    //rect(width / 2 - 1, 0, 2, height);
}

function update() {
    if (player.alive()) {
        player.update();
        for (let e of enemies) {
            e.update();
        }
        for (var i = enemies.length - 1; i >= 0; i--) {
            if (!enemies[i].getAlive()) {
                enemies.splice(i, 1);
            }
        }
        for (let l of lasers) {
            l.update();
        }
        for (var i = lasers.length - 1; i >= 0; i--) {
            if (!lasers[i].alive()) {
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
    if (keyIsDown(32)) {
        player.fire();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
