var myGamePiece;

var FIELD_WIDTH = 480;
var FIELD_HEIGHT = 270;
var canvas = document.querySelector("canvas");

function startGame() {
  new GameArena(canvas, FIELD_WIDTH, FIELD_HEIGHT, Person);
}

function GameArena(element, width, height, Person) {
  this.canvas = element;
  this.ctx = this.canvas.getContext("2d");
  this.person = new Person();
  this.start();
}

GameArena.prototype = {
  start() {
    this.canvas.width = FIELD_WIDTH;
    this.canvas.height = FIELD_HEIGHT;
    this.frameNo = 0;
    this.interval = setInterval(this.updateState.bind(this), 20);
    window.addEventListener("keydown", e => {
      e.preventDefault();
      this.keys = this.keys || [];
      this.keys[e.keyCode] = e.type == "keydown";
    });
    window.addEventListener("keyup", e => {
      this.keys[e.keyCode] = e.type == "keydown";
    });
  },
  stop() {
    clearInterval(this.interval);
  },
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  updateState() {
    this.clear();
    this.person
      .newPos({
        right: this.keys && this.keys[39],
        left: this.keys && this.keys[37],
        up: this.keys && this.keys[38],
        down: this.keys && this.keys[40]
      })
      .update(this.ctx);
  }
};

function Person(ctx, width = 30, height = 30, color = "green", x = 50, y = 50) {
  this.ctx = ctx;
  this.width = width;
  this.height = height;
  this.color = color;
  this.speed = 0;
  this.angle = 0;
  this.moveAngle = 0;
  this.x = x;
  this.y = y;
}

Person.prototype = {
  update(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
    return this;
  },
  newPos(options) {
    this.moveAngle = 0;
    this.speed = 0;
    options.left && (this.moveAngle = -5);
    options.right && (this.moveAngle = 5);
    options.up && (this.speed = 5);
    options.down && (this.speed = -5);

    this.angle += (this.moveAngle * Math.PI) / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);

    if (this.x > FIELD_WIDTH) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = FIELD_WIDTH;
    }
    if (this.y > FIELD_HEIGHT) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = FIELD_HEIGHT;
    }
    return this;
  }
};

window.onload = startGame;
