class Particle {
  constructor() {
    this.x = Math.floor(Math.random() * width);
    this.y = Math.floor(Math.random() * height);
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
  }
  draw(context) {
    context.fillStyle = "white";
    // context.fillRect(this.x - 3, this.y - 3, 6, 6);
  }
  update(context, particles) {
    if(this.x < 0 || this.x > width) this.speedX *= -1;
    if(this.y < 0 || this.y > height) this.speedY *= -1;
    this.x += this.speedX;
    this.y += this.speedY;

    for(let i = 0; i < particles.length; i++){
      for(let j = 0; j < particles.length; j++){
        let distance = Math.sqrt(((particles[i].x - particles[j].x) ** 2) + ((particles[i].y - particles[j].y) ** 2));
        if(distance < width / 7 + height / 7){
          context.lineWidth = 1;
          context.beginPath();
          context.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / 150)})`;
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);
          context.stroke();
        }
      }
    }
  }
}

class Effect {
  constructor(size = 100) {
    this.particles = [];
    this.size = size;
    this.init();
  }
  init() {
    this.particles = [];
    this.particles.push(new Particle());
    for (let i = 0; i < this.size; i++) {
      this.particles.push(new Particle());
    }
  }
  render(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update(context, this.particles);
    });
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  fx.init();
});

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);
console.log("filled");

const fx = new Effect(5);

function animate() {
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, width, height);

  fx.render(ctx);
  requestAnimationFrame(animate);
}

animate();
