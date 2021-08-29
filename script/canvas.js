const canvas = document.querySelector("canvas.main-canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext("2d");

// for (let i = 0; i < 100; i++) {
// c.beginPath();
// const x = Math.random() * window.innerWidth;
// const y = Math.random() * window.innerHeight;
// c.arc(x, y, 50, 0, Math.PI * 2, false);
// c.strokeStyle = "red";
// c.stroke();
// }

const colorArray = ["#C03221", "#A2D729", "#FAFFFD", "#FA824C"];

let mouse = {
  x: undefined,
  y: undefined,
};

const maxRadius = 40;
const minRadius = 2;

window.addEventListener("mousemove", () => {
  mouse.x = event.x;
  mouse.y = event.y;
  // console.log(mouse);
});

function Circle(x, y, dx, dy, fill) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.fill = fill;

  this.draw = function () {
    // c.beginPath();
    c.fillStyle = this.fill;
    c.fillRect(x, y, 50, 50);
    // c.stroke();
  };
  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    // console.log(this.x);
    // if (
    //   mouse.x - this.x < 50 &&
    //   mouse.x - this.x > -50 &&
    //   mouse.y - this.y < 50 &&
    //   mouse.y - this.y > -50
    // ) {
    //   if (this.r < maxRadius) {
    //     this.r += 1;
    //   }
    // } else if (this.r > minRadius) {
    //   this.r -= 1;
    // }

    this.draw();
  };
}

let circleArray = [];
for (let i = 0; i < 100; i++) {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = Math.random() * 0.3;
  let dy = Math.random() * 0.3;
  let fill = colorArray[parseInt(Math.random() * 5)];

  circleArray.push(new Circle(x, y, dx, dy, fill));
}

console.log(circleArray);
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < 100; i++) {
    circleArray[i].update();
  }
}

animate();

// footer canvas

const fCanvas = document.querySelector("canvas.footer-canvas");
// fCanvas.height = window.innerHeight;
// fCanvas.width = window.innerWidth;
