class Snake {
  private _x: number;
  private _y: number;
  private xDirection: number = 0;
  private yDirection: number = 1;
  private size: number;
  private _body: [Dot];

  constructor(x: number, y: number, size: number = 20) {
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

  move() {
    if (keyIsDown(LEFT_ARROW)) this.setDirection("left");
    else if (keyIsDown(RIGHT_ARROW)) this.setDirection("right");
    else if (keyIsDown(UP_ARROW)) this.setDirection("up");
    else if (keyIsDown(DOWN_ARROW)) this.setDirection("down");

    
    // [{x,y}, {x,y}, {x,y}, {x,y}]
    let firstEl = this._body.shift() as Dot;
    firstEl.x = this._x;
    firstEl.y = this._y;
    
    this._x += this.size * this.xDirection;
    this._y += this.size * this.yDirection;

    this._body.push(firstEl);
  }

  show() {
    push();

    angleMode(DEGREES);
    imageMode(CENTER);
    push();
    translate(this.x + this.size / 2, this.y + this.size / 2);
    if (this.xDirection == 1) rotate(90);
    if (this.xDirection == -1) rotate(-90);
    if (this.yDirection == 1) rotate(180);
    if (this.yDirection == -1) rotate(0);
    image(head, 0, 0, this.size, this.size);
    pop();
    this._body.forEach((el, i) => {
      if (i === 0) {
        push();
        translate(el.x + this.size / 2, el.y + this.size / 2);
        const aheadEl: Dot = this._body[i + 1];
        if (aheadEl) {
          if (aheadEl.y > el.y) rotate(180);
          if (aheadEl.y < el.y) rotate(0);
          if (aheadEl.x > el.x) rotate(90);
          if (aheadEl.x < el.x) rotate(-90);
        } else {
          if (this.xDirection == 1) rotate(90);
          if (this.xDirection == -1) rotate(-90);
          if (this.yDirection == 1) rotate(180);
          if (this.yDirection == -1) rotate(0);
        }
        image(tailEnd, 0, 0, this.size, this.size);
        pop();
      } else {
        push();
        translate(el.x + this.size / 2, el.y + this.size / 2);
        const aheadEl: Dot = this._body[i + 1];
        if (aheadEl) {
          if (aheadEl.y > el.y) rotate(180);
          if (aheadEl.y < el.y) rotate(0);
          if (aheadEl.x > el.x) rotate(90);
          if (aheadEl.x < el.x) rotate(-90);
        }

        image(tail, 0, 0, this.size, this.size);
        pop();
      }
    });
    pop();
  }

  private setDirection(direction: string) {
    switch (direction) {
      case "up":
        if (this.yDirection == 1) break;
        this.xDirection = 0;
        this.yDirection = -1;
        break;
      case "down":
        if (this.yDirection == -1) break;
        this.xDirection = 0;
        this.yDirection = 1;
        break;
      case "left":
        if (this.xDirection == 1) break;
        this.xDirection = -1;
        this.yDirection = 0;
        break;
      default:
        if (this.xDirection == -1) break;
        this.xDirection = 1;
        this.yDirection = 0;
    }
  }

  eat(): void {
    const newTailPart: Dot = {
      x: this._x,
      y: this._y
    };

    this._body.push(newTailPart);
  }

  isDead(): boolean {
    for (let el of this._body) {
      if (el.x === this.x && el.y === this.y) {
        return true;
      }
    }
    return false;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get tail(): [Dot] {
    return this._body
  }
}
