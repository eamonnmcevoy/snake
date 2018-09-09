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

const width = 50;
const height = 50;
const blockarea = 10;
const margin = 1;
const blocksize = blockarea - margin;

const canvas = document.getElementById('game');
canvas.width = width * blockarea;
canvas.height = height * blockarea;
const ctx = canvas.getContext('2d', { alpha: true });

const grid = new Grid(width, height, blockarea, margin, ctx);
grid.render();