"use strict";
var Ball = (function () {
    function Ball(x, y, radius, speed) {
        if (radius === void 0) { radius = 100; }
        if (speed === void 0) { speed = 1; }
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.7;
        this.friction = 0.95;
        this.bouncePower = 20;
        this.moveLeft = false;
        this.moveRight = false;
        this.isBouncing = true;
    }
    Ball.prototype.displayBall = function () {
        noStroke();
        fill(0);
        circle(this.x, this.y, this.radius * 2);
    };
    Ball.prototype.moveBall = function () {
        key;
        if (this.moveLeft) {
            this.velocity.x -= this.speed;
        }
        if (this.moveRight) {
            this.velocity.x += this.speed;
        }
        if (!this.isBouncing && this.y >= this.radius) {
            this.velocity.y -= this.bouncePower;
            this.isBouncing = true;
        }
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.x *= this.friction;
        if (this.y >= height - this.radius) {
            this.y = height - this.radius;
            this.isBouncing = false;
            this.velocity.y = 0;
        }
    };
    Ball.prototype.keyHandler = function (event) {
        var keyState = event.type == "keydown" ? true : false;
        switch (keyCode) {
            case 37:
                this.moveLeft = keyState;
                break;
            case 39:
                this.moveRight = keyState;
                break;
        }
    };
    return Ball;
}());
function preload() {
    apple = loadImage("./../assets/images/bulle.png");
    head = loadImage("./../assets/images/head.png");
    tail = loadImage("./../assets/images/tail.png");
    tailEnd = loadImage("./../assets/images/tail-end.png");
}
var size;
var snake;
var dot;
var head;
var tail;
var tailEnd;
var apple;
function setup() {
    createCanvas(800, 800);
    frameRate(5);
    noStroke();
    size = floor(width / 20);
    snake = createSnake();
    dot = createDot(floor(random(size, width - size) / size) * size, floor(random(size, height - size) / size) * size);
}
function draw() {
    background(0);
    snake.move();
    snake.show();
    if (snake.isDead()) {
        snake = createSnake();
    }
    if (snake.x < 0 || snake.x + size > width) {
        snake = createSnake();
    }
    else if (snake.y < 0 || snake.y + size > height) {
        snake = createSnake();
    }
    var d = dist(snake.x, snake.y, dot.x, dot.y);
    if (d < 20) {
        var isEmptySpace = false;
        var x = void 0, y = void 0;
        do {
            x = floor(random(size, width - size) / size) * size;
            y = floor(random(size, height - size) / size) * size;
            if (snake.x === x && snake.y === y)
                continue;
            for (var _i = 0, _a = snake.tail; _i < _a.length; _i++) {
                var el = _a[_i];
                if (el.x === x && el.y === y) {
                    isEmptySpace = false;
                    break;
                }
                else {
                    isEmptySpace = true;
                }
            }
        } while (!isEmptySpace);
        dot = createDot(x, y);
        snake.eat();
    }
    push();
    fill("red");
    image(apple, dot.x, dot.y, size, size);
    pop();
    angle += 10;
}
var angle = 0;
function windowResized() {
    resizeCanvas(800, 800);
}
function mousePressed(event) {
    snake.eat();
}
function createSnake() {
    return new Snake(floor(width / 2 / size) * size, floor(height / 2 / size) * size, size);
}
function createDot(x, y) {
    return {
        x: x,
        y: y
    };
}
var Snake = (function () {
    function Snake(x, y, size) {
        if (size === void 0) { size = 20; }
        this.xDirection = 0;
        this.yDirection = 1;
        this._x = x;
        this._y = y;
        this.size = size;
        this._body = [
            {
                x: this._x,
                y: this._y
            }
        ];
    }
    Snake.prototype.move = function () {
        if (keyIsDown(LEFT_ARROW))
            this.setDirection("left");
        else if (keyIsDown(RIGHT_ARROW))
            this.setDirection("right");
        else if (keyIsDown(UP_ARROW))
            this.setDirection("up");
        else if (keyIsDown(DOWN_ARROW))
            this.setDirection("down");
        var firstEl = this._body.shift();
        firstEl.x = this._x;
        firstEl.y = this._y;
        this._x += this.size * this.xDirection;
        this._y += this.size * this.yDirection;
        this._body.push(firstEl);
    };
    Snake.prototype.show = function () {
        var _this = this;
        push();
        angleMode(DEGREES);
        imageMode(CENTER);
        push();
        translate(this.x + this.size / 2, this.y + this.size / 2);
        if (this.xDirection == 1)
            rotate(90);
        if (this.xDirection == -1)
            rotate(-90);
        if (this.yDirection == 1)
            rotate(180);
        if (this.yDirection == -1)
            rotate(0);
        image(head, 0, 0, this.size, this.size);
        pop();
        this._body.forEach(function (el, i) {
            if (i === 0) {
                push();
                translate(el.x + _this.size / 2, el.y + _this.size / 2);
                var aheadEl = _this._body[i + 1];
                if (aheadEl) {
                    if (aheadEl.y > el.y)
                        rotate(180);
                    if (aheadEl.y < el.y)
                        rotate(0);
                    if (aheadEl.x > el.x)
                        rotate(90);
                    if (aheadEl.x < el.x)
                        rotate(-90);
                }
                else {
                    if (_this.xDirection == 1)
                        rotate(90);
                    if (_this.xDirection == -1)
                        rotate(-90);
                    if (_this.yDirection == 1)
                        rotate(180);
                    if (_this.yDirection == -1)
                        rotate(0);
                }
                image(tailEnd, 0, 0, _this.size, _this.size);
                pop();
            }
            else {
                push();
                translate(el.x + _this.size / 2, el.y + _this.size / 2);
                var aheadEl = _this._body[i + 1];
                if (aheadEl) {
                    if (aheadEl.y > el.y)
                        rotate(180);
                    if (aheadEl.y < el.y)
                        rotate(0);
                    if (aheadEl.x > el.x)
                        rotate(90);
                    if (aheadEl.x < el.x)
                        rotate(-90);
                }
                image(tail, 0, 0, _this.size, _this.size);
                pop();
            }
        });
        pop();
    };
    Snake.prototype.setDirection = function (direction) {
        switch (direction) {
            case "up":
                if (this.yDirection == 1)
                    break;
                this.xDirection = 0;
                this.yDirection = -1;
                break;
            case "down":
                if (this.yDirection == -1)
                    break;
                this.xDirection = 0;
                this.yDirection = 1;
                break;
            case "left":
                if (this.xDirection == 1)
                    break;
                this.xDirection = -1;
                this.yDirection = 0;
                break;
            default:
                if (this.xDirection == -1)
                    break;
                this.xDirection = 1;
                this.yDirection = 0;
        }
    };
    Snake.prototype.eat = function () {
        var newTailPart = {
            x: this._x,
            y: this._y
        };
        this._body.push(newTailPart);
    };
    Snake.prototype.isDead = function () {
        for (var _i = 0, _a = this._body; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.x === this.x && el.y === this.y) {
                return true;
            }
        }
        return false;
    };
    Object.defineProperty(Snake.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "tail", {
        get: function () {
            return this._body;
        },
        enumerable: true,
        configurable: true
    });
    return Snake;
}());
//# sourceMappingURL=bundle.js.map