// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.minSpeed = 250;
    this.maxSpeed = 450;
    this.x = -100;
    this.y = row * 83 - 21;
    this.speedRandomnizer = new Speed();
    this.speed = this.speedRandomnizer.random(this.minSpeed, this.maxSpeed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = Math.round(this.x + (this.speed * dt));
    if (this.x > 505) {
        this.x = -100;
        this.speed = this.speedRandomnizer.random(this.minSpeed, this.maxSpeed);
    }

    if (this.isCollidingWithPlayer()) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Collision between Enemy and Player
Enemy.prototype.isCollidingWithPlayer = function() {
    return player.getCurrentTile() === this.getCurrentTile();
};

// Calculating Current Tile Position of Enemy
Enemy.prototype.getCurrentTile = function () {
    return parseInt('' + Math.round((100 + this.x) / 100) + '' + Math.round((100 + this.y) / 83) + '');
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};

Player.prototype.update = function(dt) {
    if (this.y < 68) {
        this.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Moving Player to initial Position when reaching water and/or colliding with an Enemy
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 400;
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        this.moveToPosition(this.x - 101, this.y);
    } else if (direction === 'up') {
        this.moveToPosition(this.x, this.y - 83);
    } else if (direction === 'right') {
        this.moveToPosition(this.x + 101, this.y);
    } else if (direction === 'down') {
        this.moveToPosition(this.x, this.y + 83);
    }
};

Player.prototype.moveToPosition = function(x, y) {
    if (x > 404 || x < -1) {
        return;
    }
    if (y > 400 || y < -15) {
        return;
    }
    this.x = x;
    this.y = y;
};

// Calculating Current Tile Position of Player
Player.prototype.getCurrentTile = function () {
    return parseInt('' + Math.round((100 + this.x) / 100) + '' + Math.round((100 + this.y) / 83) + '');
};

// Defining Speed
var Speed = function() {
};

Speed.prototype.random = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
        //The maximum is inclusive and the minimum is inclusive
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

