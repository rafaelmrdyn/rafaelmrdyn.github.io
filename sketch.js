const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let rafo;
let world, engine;
let mConstraint;
let slingshot;

let dotImg;
let boxImg;
let bkgImg;

function preload() {
  dotImg = loadImage('https://i.imgur.com/d0nXFfh.png');
  boxImg = loadImage('https://i.imgur.com/6qPukFi.png');
  bkgImg = loadImage('https://i.imgur.com/Qz6FEcB.png');
}

function setup() {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height - 10, width, 20);
  for (let i = 0; i < 7; i++) {
    let w = i%2 ? window.innerWidth - 400 : window.innerWidth - 300
    boxes[i] = new Box(w, 300 - i * 75, 84, 100);
  }
  rafo = new Rafo(200, window.innerHeight - 400, 30);

  slingshot = new SlingShot(300, window.innerHeight - 200, rafo.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function keyPressed() {
  if (key == ' ') {
    World.remove(world, rafo.body);
    rafo = new Rafo(150, 300, 25);
    slingshot.attach(rafo.body);
  }
}

function mouseReleased() {
  setTimeout(() => {
    slingshot.fly();
  }, 100);
}

function draw() {
  background(bkgImg);
  Matter.Engine.update(engine);
  ground.show();
  for (let box of boxes) {
    box.show();
  }
  slingshot.show();
  rafo.show();
}