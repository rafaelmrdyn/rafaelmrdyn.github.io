const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;

let ground;
const boxes = [];
let rafo;
let world, engine;
let mConstraint;
let slingshot;

function preload() {
  dotImg = loadImage('/rafo.png');
  jsImg = loadImage('/logo/js.svg');
  bkgImg = loadImage('/black.png');
  letter = {
    'a': loadImage('/letters/a.svg'),
    'b': loadImage('/letters/b.svg'),
    'c': loadImage('/letters/c.svg'),
    'd': loadImage('/letters/d.svg'),
    'e': loadImage('/letters/e.svg'),
    'f': loadImage('/letters/f.svg'),
    'g': loadImage('/letters/g.svg'),
    'h': loadImage('/letters/h.svg'),
    'i': loadImage('/letters/i.svg'),
    'j': loadImage('/letters/j.svg'),
    'k': loadImage('/letters/k.svg'),
    'l': loadImage('/letters/l.svg'),
    'm': loadImage('/letters/m.svg'),
    'n': loadImage('/letters/n.svg'),
    'o': loadImage('/letters/o.svg'),
    'p': loadImage('/letters/p.svg'),
    'q': loadImage('/letters/q.svg'),
    'r': loadImage('/letters/r.svg'),
    's': loadImage('/letters/s.svg'),
    't': loadImage('/letters/t.svg'),
    'u': loadImage('/letters/u.svg'),
    'v': loadImage('/letters/v.svg'),
    'w': loadImage('/letters/w.svg'),
    'x': loadImage('/letters/x.svg'),
    'y': loadImage('/letters/y.svg'),
    'z': loadImage('/letters/z.svg'),
    '@': loadImage('/letters/@.svg'),
    '~': loadImage('/letters/~.svg'),
    'hash': loadImage('/letters/$.svg'),
    'dot': loadImage('/letters/dot.svg'),
    'R': loadImage('/letters/RMJS/R.svg'),
    'M': loadImage('/letters/RMJS/M.svg'),
    'J': loadImage('/letters/RMJS/J.svg'),
    'S': loadImage('/letters/RMJS/S.svg'),
  }
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
  letters = [
    new Letter(letter['r'], 20, 30, 10, 20),
    new Letter(letter['o'], 30, 30, 10, 20),
    new Letter(letter['o'], 40, 30, 10, 20),
    new Letter(letter['t'], 50, 30, 10, 20),
    new Letter(letter['@'], 60, 30, 10, 20),
    new Letter(letter['r'], 70, 30, 10, 20),
    new Letter(letter['a'], 80, 30, 10, 20),
    new Letter(letter['f'], 90, 30, 10, 20),
    new Letter(letter['a'], 100, 30, 10, 20),
    new Letter(letter['e'], 110, 30, 10, 20),
    new Letter(letter['l'], 120, 30, 10, 20),
    new Letter(letter['m'], 130, 30, 10, 20),
    new Letter(letter['r'], 140, 30, 10, 20),
    new Letter(letter['d'], 150, 30, 10, 20),
    new Letter(letter['y'], 160, 30, 10, 20),
    new Letter(letter['n'], 170, 30, 10, 20),
    new Letter(letter['~'], 180, 30, 10, 20),
    new Letter(letter['hash'], 190, 30, 10, 20),
    new Letter(letter['r'], 210, 30, 10, 20),
    new Letter(letter['a'], 220, 30, 10, 20),
    new Letter(letter['f'], 230, 30, 10, 20),
    new Letter(letter['a'], 240, 30, 10, 20),
    new Letter(letter['e'], 250, 30, 10, 20),
    new Letter(letter['l'], 260, 30, 10, 20),
    new Letter(letter['i'], 280, 30, 10, 20),
    new Letter(letter['n'], 290, 30, 10, 20),
    new Letter(letter['f'], 300, 30, 10, 20),
    new Letter(letter['o'], 310, 30, 10, 20),
    new Letter(letter['f'], 20, 60, 10, 20),
    new Letter(letter['u'], 30, 60, 10, 20),
    new Letter(letter['l'], 40, 60, 10, 20),
    new Letter(letter['l'], 50, 60, 10, 20),
    new Letter(letter['n'], 60, 60, 10, 20),
    new Letter(letter['a'], 70, 60, 10, 20),
    new Letter(letter['m'], 80, 60, 10, 20),
    new Letter(letter['e'], 90, 60, 10, 20),
    new Letter(letter['~'], 110, 60, 10, 20),
    new Letter(letter['R'], 130, 60, 10, 20),
    new Letter(letter['a'], 140, 60, 10, 20),
    new Letter(letter['f'], 150, 60, 10, 20),
    new Letter(letter['a'], 160, 60, 10, 20),
    new Letter(letter['e'], 170, 60, 10, 20),
    new Letter(letter['l'], 180, 60, 10, 20),
    new Letter(letter['M'], 200, 60, 10, 20),
    new Letter(letter['u'], 210, 60, 10, 20),
    new Letter(letter['r'], 220, 60, 10, 20),
    new Letter(letter['a'], 230, 60, 10, 20),
    new Letter(letter['d'], 240, 60, 10, 20),
    new Letter(letter['y'], 250, 60, 10, 20),
    new Letter(letter['a'], 260, 60, 10, 20),
    new Letter(letter['n'], 270, 60, 10, 20),
    new Letter(letter['e'], 20, 85, 10, 20),
    new Letter(letter['m'], 30, 85, 10, 20),
    new Letter(letter['a'], 40, 85, 10, 20),
    new Letter(letter['i'], 50, 85, 10, 20),
    new Letter(letter['l'], 60, 85, 10, 20),
    new Letter(letter['~'], 80, 85, 10, 20),
    new Letter(letter['r'], 100, 85, 10, 20),
    new Letter(letter['a'], 110, 85, 10, 20),
    new Letter(letter['f'], 120, 85, 10, 20),
    new Letter(letter['a'], 130, 85, 10, 20),
    new Letter(letter['e'], 140, 85, 10, 20),
    new Letter(letter['l'], 150, 85, 10, 20),
    new Letter(letter['m'], 160, 85, 10, 20),
    new Letter(letter['r'], 170, 85, 10, 20),
    new Letter(letter['d'], 180, 85, 10, 20),
    new Letter(letter['y'], 190, 85, 10, 20),
    new Letter(letter['n'], 200, 85, 10, 20),
    new Letter(letter['@'], 210, 85, 10, 20),
    new Letter(letter['g'], 220, 85, 10, 20),
    new Letter(letter['m'], 230, 85, 10, 20),
    new Letter(letter['a'], 240, 85, 10, 20),
    new Letter(letter['i'], 250, 85, 10, 20),
    new Letter(letter['l'], 260, 85, 10, 20),
    new Letter(letter['dot'], 270, 85, 10, 20),
    new Letter(letter['c'], 280, 85, 10, 20),
    new Letter(letter['o'], 290, 85, 10, 20),
    new Letter(letter['m'], 300, 85, 10, 20),
    new Letter(letter['r'], 20, 110, 10, 20),
    new Letter(letter['o'], 30, 110, 10, 20),
    new Letter(letter['l'], 40, 110, 10, 20),
    new Letter(letter['e'], 50, 110, 10, 20),
    new Letter(letter['~'], 70, 110, 10, 20),
    new Letter(letter['J'], 90, 110, 10, 20),
    new Letter(letter['a'], 100, 110, 10, 20),
    new Letter(letter['v'], 110, 110, 10, 20),
    new Letter(letter['a'], 120, 110, 10, 20),
    new Letter(letter['S'], 130, 110, 10, 20),
    new Letter(letter['c'], 140, 110, 10, 20),
    new Letter(letter['r'], 150, 110, 10, 20),
    new Letter(letter['i'], 160, 110, 10, 20),
    new Letter(letter['p'], 170, 110, 10, 20),
    new Letter(letter['t'], 180, 110, 10, 20),
    new Letter(letter['d'], 200, 110, 10, 20),
    new Letter(letter['e'], 210, 110, 10, 20),
    new Letter(letter['v'], 220, 110, 10, 20),
    new Letter(letter['e'], 230, 110, 10, 20),
    new Letter(letter['l'], 240, 110, 10, 20),
    new Letter(letter['o'], 250, 110, 10, 20),
    new Letter(letter['p'], 260, 110, 10, 20),
    new Letter(letter['e'], 270, 110, 10, 20),
    new Letter(letter['r'], 280, 110, 10, 20),
    new Letter(letter['g'], 20, 135, 10, 20),
    new Letter(letter['i'], 30, 135, 10, 20),
    new Letter(letter['t'], 40, 135, 10, 20),
    new Letter(letter['h'], 50, 135, 10, 20),
    new Letter(letter['u'], 60, 135, 10, 20),
    new Letter(letter['b'], 70, 135, 10, 20),
    new Letter(letter['~'], 90, 135, 10, 20),
    new Letter(letter['@'], 110, 135, 10, 20),
    new Letter(letter['r'], 120, 135, 10, 20),
    new Letter(letter['a'], 130, 135, 10, 20),
    new Letter(letter['f'], 140, 135, 10, 20),
    new Letter(letter['a'], 150, 135, 10, 20),
    new Letter(letter['e'], 160, 135, 10, 20),
    new Letter(letter['l'], 170, 135, 10, 20),
    new Letter(letter['m'], 180, 135, 10, 20),
    new Letter(letter['r'], 190, 135, 10, 20),
    new Letter(letter['d'], 200, 135, 10, 20),
    new Letter(letter['y'], 210, 135, 10, 20),
    new Letter(letter['n'], 220, 135, 10, 20),
  ]
  slingshot = new SlingShot(300, window.innerHeight - 200, rafo.body);

  const mouse = Mouse.create(canvas.elt);
  const options = {
    mouse: mouse
  };

  mouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
  Matter.Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(function(obj){
      if (obj.bodyA.isStatic && obj.bodyA.position.y < height - 10) {
        Matter.Body.setStatic(obj.bodyA, false);
      }
      if (obj.bodyB.isStatic && obj.bodyB.position.y < height - 10) {
        Matter.Body.setStatic(obj.bodyB, false);
      }
    })
  });
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
  for (let l of letters) {
    l.show();
  }
  // if (mouseConstraint.body) {
  //   console.log(mouseConstraint.body)
  // }
  slingshot.show();
  rafo.show();
}


