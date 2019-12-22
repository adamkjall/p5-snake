/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */

function preload() {
  // Tyvärr har jag inte fått till den globala typningen för
  // inladdningen av ljud men fungerar bra enligt nedan..
  // sound = (window as any).loadSound('../assets/mySound.wav');
  apple = loadImage("./../assets/images/bulle.png");
  head = loadImage("./../assets/images/head.png");
  tail = loadImage("./../assets/images/tail.png");
  tailEnd = loadImage("./../assets/images/tail-end.png");
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function below
 */

type Dot = { x: number; y: number };

let size: number;
let snake: Snake;
let dot: Dot;

let head: p5.Image;
let tail: p5.Image;
let tailEnd: p5.Image;
let apple: p5.Image;

function setup() {
  createCanvas(800, 800);
  frameRate(5);
  noStroke();
  size = floor(width / 20);

  snake = createSnake();

  dot = createDot(
    floor(random(size, width - size) / size) * size,
    floor(random(size, height - size) / size) * size
  );
}

/**
 * Built in draw function in P5
 * This is a good place to call public funcions of the object
 * you created in the setup function above
 */
function draw() {
  background(0);

  snake.move();
  snake.show();

  if (snake.isDead()) {
    snake = createSnake();
  }

  if (snake.x < 0 || snake.x + size > width) {
    snake = createSnake();
  } else if (snake.y < 0 || snake.y + size > height) {
    snake = createSnake();
  }

  const d = dist(snake.x, snake.y, dot.x, dot.y);
  if (d < 20) {
    let isEmptySpace = false;
    let x: number, y: number;
    do {
      x = floor(random(size, width - size) / size) * size;
      y = floor(random(size, height - size) / size) * size;

      if (snake.x === x && snake.y === y) continue;
      for (let el of snake.tail) {
        if (el.x === x && el.y === y) {
          isEmptySpace = false;
          break;
        } else {
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
  // angleMode(DEGREES);

  // translate(dot.x, dot.y);
  // imageMode(CENTER)
  // rotate(angle);
  // image(apple, 0, 0, size, size);
  pop();
  angle += 10;
}
let angle = 0;

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(800, 800);
}

function mousePressed() {
  if (snake) {
    snake.eat();
  }
}

// function keyReleased(event: Event) {

// }

function createSnake() {
  return new Snake(
    floor(width / 2 / size) * size,
    floor(height / 2 / size) * size,
    size
  );
}

function createDot(x: number, y: number): Dot {
  return {
    x,
    y
  };
}
