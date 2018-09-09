class Grid {
  constructor(width, height, blockarea, margin, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.blockarea = blockarea;
    this.margin = margin;
    this.blocksize = blockarea - margin;
  }

  render() {
    for(let x=0; x<width; x++) {
      for(let y=0; y<height; y++) {
        const point = { x, y };
        this.ctx.fillStyle = 'lightgrey';
        ctx.clearRect(point.x * blockarea, point.y * blockarea, blocksize, blocksize);
        ctx.fillRect(point.x * blockarea, point.y * blockarea, blocksize, blocksize);
      }
    }
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