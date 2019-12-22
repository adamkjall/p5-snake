class Ball {
  private x: number;
  private y: number;
  private radius: number;
  private speed: number;
  private velocity: { x: number; y: number };
  private gravity: number;
  private friction: number;
  private bouncePower: number;
  private moveLeft : boolean;
  private moveRight : boolean;
  private isBouncing: boolean;

  constructor(x: number, y: number, radius: number = 100, speed: number = 1) {
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

  displayBall() : void {
    noStroke();
    fill(0);
    circle(this.x, this.y, this.radius * 2);
  }

  moveBall() : void {
    key
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
    // yVelocity *= .97;

    if (this.y >= height - this.radius) {
      this.y = height - this.radius;
      this.isBouncing = false;
      this.velocity.y = 0;
    }
  }

  keyHandler(event: Event) : void {
    let keyState : boolean = event.type == "keydown" ? true : false;
    
    switch (keyCode) {
      case 37:
        this.moveLeft = keyState;
        break;
      case 39:
        this.moveRight = keyState;
        break;
    }
  }

}
