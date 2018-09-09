class Grid {
  constructor(width, height, blockarea, margin, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.blockarea = blockarea;
    this.margin = margin;
    this.blocksize = blockarea - margin;

    this.generateDataSet();
  }

  generateDataSet() {
    this.dataset = [];
    for (let x = 0; x < width; x++) {
      this.dataset[x] = [height];
      for (let y = 0; y < height; y++) {
        this.setPoint({ x, y }, 'off');
      }
    }
  }

  setPoint(point, state) {
    this.dataset[point.x][point.y] = state;
  }

  getPoint(point) {
    return this.dataset[point.x][point.y];
  }

  render() {
    for(let x=0; x<width; x++) {
      for(let y=0; y<height; y++) {
        const point = {x,y};
        const state = this.getPoint(point);
        this.ctx.fillStyle = this.getFillStyle(state);
        ctx.clearRect(point.x * blockarea, point.y * blockarea, blocksize, blocksize);
        ctx.fillRect(point.x * blockarea, point.y * blockarea, blocksize, blocksize);
      }
    }
  }

  getFillStyle(state) {
    switch(state) {
      case 'on':
        return 'green';
      case 'off':
        return 'lightgrey';
      default:
        return 'lightgrey';
    };
  }
}

class Snake {
  constructor(position) {
    this.parts = [position];
  }

  update() {
    const updates = [];


    const next = Object.assign({}, snake.parts[0]);
    next.x++;
    const previousTailPosition = Object.assign({},this.parts[this.parts.length - 1]);
    this.parts[this.parts.length - 1] = next;


    updates.push({ point: this.head, state: 'on' });
    updates.push({ point: previousTailPosition, state: 'off' });
    return updates;
  }

  get head() {
    return Object.assign({}, this.parts[0]);
  }

  get isAlive() {
    const collidesWithSelf = this.parts.filter(_ => this.collision(_,this.head)).length > 1;
    const collidesWithEdge = this.head.x < 0 ||
                             this.head.x >= height ||
                             this.head.y < 0 ||
                             this.head.y >= width;
    return (!collidesWithEdge && !collidesWithSelf);
  }

  collision(a, b) {
    return (a.x===b.x && a.y===b.y);
  }
}

class Game {
  constructor(grid, snake) {
    this.grid = grid;
    this.snake = snake;
  }

  async run() {
    while (true) {
      this.grid.render();
      
      const updates = this.snake.update();
      
      if(!this.snake.isAlive)
        break;

      updates.forEach(x => {
        this.grid.setPoint(x.point, x.state);
      });
  
      await this.sleep(delay);
    }

    document.getElementById("gameover").innerHTML = `You crashed!`;

  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const width = 50;
const height = 50;
const blockarea = 10;
const margin = 1;
const blocksize = blockarea - margin;
const delay = 50;

const canvas = document.getElementById('game');
canvas.width = width * blockarea;
canvas.height = height * blockarea;
const ctx = canvas.getContext('2d', { alpha: true });

const grid = new Grid(width, height, blockarea, margin, ctx);
const snake = new Snake({x:10, y:10});
const game = new Game(grid, snake, delay);

game.run();
