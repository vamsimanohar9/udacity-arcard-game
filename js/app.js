var Enemy = function(x, y, speed) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
    this.checkCollision();
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {
        console.log('collision');
        gameReset();
    }
};

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x = (this.x - this.speed + 505) % 505;
    } else if (key == 'right') {
        this.x = (this.x + this.speed) % 505;
    } else if (key == 'up') {
        this.y = (this.y - this.speed + 606) % 606;
        if (this.y <= (83 - 48)) {
            gameOver();
            return;
        }
    } else {
        this.y = (this.y + this.speed) % 606;
        if (this.y > 400) {
            this.y = 400;
        }
    }

    if (this.x < 2.5) {
        this.x = 2.5;
    }
    if (this.x > 458) {
        this.x = 458;
    }
};


Player.prototype.reset = function() {
    this.x = 202.5;
    this.y = 383;
};


var allEnemies = [];
var player = new Player(0, 0, 50);
var scoreDiv = document.createElement('div');
gameReset();
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


var score = 0;


function gameReset() {
    player.reset();
    score = 0;
    updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60)
    );
}

function gameOver() {
    player.reset();
    score += 1;
    updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}