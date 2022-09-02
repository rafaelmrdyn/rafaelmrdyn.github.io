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
  ethImg = loadImage('/logo/eth.svg');
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
    'line': loadImage('/letters/line.svg'),
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
    new Letter(letter['r'], 20, 35, 8, 11),
    new Letter(letter['o'], 30, 35, 8, 11),
    new Letter(letter['o'], 40, 35, 8, 11),
    new Letter(letter['t'], 50, 34, 8, 14),
    new Letter(letter['@'], 65, 34, 15, 14),
    new Letter(letter['r'], 80, 35, 8, 11),
    new Letter(letter['a'], 90, 35, 8, 11),
    new Letter(letter['f'], 100, 34, 8, 14),
    new Letter(letter['a'], 110, 35, 8, 11),
    new Letter(letter['e'], 120, 35, 8, 11),
    new Letter(letter['l'], 130, 34, 8, 14),
    new Letter(letter['m'], 142, 35, 13, 11),
    new Letter(letter['r'], 154, 35, 8, 11),
    new Letter(letter['d'], 164, 34, 8, 14),
    new Letter(letter['y'], 174, 37, 8, 14),
    new Letter(letter['n'], 184, 35, 8, 11),
    new Letter(letter['line'], 196, 36, 10, 5),
    new Letter(letter['hash'], 210, 36, 10, 18),
    new Letter(letter['r'], 230, 35, 8, 11),
    new Letter(letter['a'], 240, 35, 8, 11),
    new Letter(letter['f'], 250, 34, 8, 14),
    new Letter(letter['a'], 260, 35, 8, 11),
    new Letter(letter['e'], 270, 34, 8, 11),
    new Letter(letter['l'], 280, 34, 8, 14),
    new Letter(letter['i'], 300, 34, 8, 14),
    new Letter(letter['n'], 310, 35, 8, 11),
    new Letter(letter['f'], 320, 34, 8, 14),
    new Letter(letter['o'], 330, 35, 8, 11),
    new Letter(letter['f'], 20, 64, 8, 14),
    new Letter(letter['u'], 30, 65, 8, 11),
    new Letter(letter['l'], 40, 65, 8, 14),
    new Letter(letter['l'], 50, 66, 8, 14),
    new Letter(letter['n'], 61, 65, 8, 11),
    new Letter(letter['a'], 72, 65, 8, 11),
    new Letter(letter['m'], 85, 65, 13, 11),
    new Letter(letter['e'], 98, 65, 8, 11),
    new Letter(letter['line'], 110, 65, 10, 5),
    new Letter(letter['R'], 130, 65, 10, 16),
    new Letter(letter['a'], 140, 65, 8, 11),
    new Letter(letter['f'], 150, 65, 8, 14),
    new Letter(letter['a'], 160, 65, 8, 11),
    new Letter(letter['e'], 170, 65, 8, 11),
    new Letter(letter['l'], 180, 65, 8, 14),
    new Letter(letter['M'], 200, 65, 16, 16),
    new Letter(letter['u'], 214, 65, 8, 11),
    new Letter(letter['r'], 224, 65, 8, 11),
    new Letter(letter['a'], 234, 65, 8, 11),
    new Letter(letter['d'], 244, 65, 8, 14),
    new Letter(letter['y'], 254, 67, 8, 14),
    new Letter(letter['a'], 264, 65, 8, 11),
    new Letter(letter['n'], 274, 65, 8, 11),
    new Letter(letter['e'], 20, 95, 8, 11),
    new Letter(letter['m'], 30, 95, 8, 11),
    new Letter(letter['a'], 40, 95, 8, 11),
    new Letter(letter['i'], 50, 94, 8, 14),
    new Letter(letter['l'], 60, 95, 8, 14),
    new Letter(letter['line'], 80, 95, 10, 5),
    new Letter(letter['r'], 100, 95, 8, 11),
    new Letter(letter['a'], 110, 95, 8, 11),
    new Letter(letter['f'], 120, 94, 8, 14),
    new Letter(letter['a'], 130, 95, 8, 11),
    new Letter(letter['e'], 140, 95, 8, 11),
    new Letter(letter['l'], 150, 94, 8, 14),
    new Letter(letter['m'], 162, 95, 13, 11),
    new Letter(letter['r'], 174, 95, 8, 11),
    new Letter(letter['d'], 184, 94, 8, 14),
    new Letter(letter['y'], 194, 97, 8, 14),
    new Letter(letter['n'], 204, 95, 8, 11),
    new Letter(letter['@'], 218, 95, 15, 14),
    new Letter(letter['g'], 232, 97, 8, 14),
    new Letter(letter['m'], 245, 95, 13, 11),
    new Letter(letter['a'], 256, 95, 8, 11),
    new Letter(letter['i'], 267, 95, 8, 14),
    new Letter(letter['l'], 276, 95, 8, 14),
    new Letter(letter['dot'], 285, 100, 5, 5),
    new Letter(letter['c'], 294, 95, 8, 11),
    new Letter(letter['o'], 304, 95, 8, 11),
    new Letter(letter['m'], 319, 95, 13, 11),
    new Letter(letter['r'], 20, 125, 8, 11),
    new Letter(letter['o'], 30, 125, 8, 11),
    new Letter(letter['l'], 40, 124, 8, 14),
    new Letter(letter['e'], 50, 125, 8, 11),
    new Letter(letter['line'], 70, 125, 10, 5),
    new Letter(letter['J'], 90, 125, 10, 16),
    new Letter(letter['a'], 100, 125, 8, 11),
    new Letter(letter['v'], 110, 125, 8, 11),
    new Letter(letter['a'], 120, 125, 8, 11),
    new Letter(letter['S'], 130, 125, 10, 16),
    new Letter(letter['c'], 140, 125, 8, 11),
    new Letter(letter['r'], 150, 125, 8, 11),
    new Letter(letter['i'], 160, 125, 8, 14),
    new Letter(letter['p'], 170, 125, 8, 14),
    new Letter(letter['t'], 180, 125, 8, 14),
    new Letter(letter['d'], 200, 125, 8, 14),
    new Letter(letter['e'], 210, 125, 8, 11),
    new Letter(letter['v'], 220, 125, 8, 11),
    new Letter(letter['e'], 230, 125, 8, 11),
    new Letter(letter['l'], 240, 125, 8, 14),
    new Letter(letter['o'], 250, 125, 8, 11),
    new Letter(letter['p'], 260, 125, 8, 14),
    new Letter(letter['e'], 270, 125, 8, 11),
    new Letter(letter['r'], 280, 125, 8, 11),
    new Letter(letter['g'], 20, 153, 8, 14),
    new Letter(letter['i'], 30, 153, 8, 14),
    new Letter(letter['t'], 40, 153, 8, 14),
    new Letter(letter['h'], 50, 153, 8, 14),
    new Letter(letter['u'], 60, 153, 8, 11),
    new Letter(letter['b'], 70, 153, 8, 14),
    new Letter(letter['line'], 90, 153, 10, 5),
    new Letter(letter['@'], 114, 153, 15, 14),
    new Letter(letter['r'], 130, 153, 8, 11),
    new Letter(letter['a'], 140, 153, 8, 11),
    new Letter(letter['f'], 150, 152, 8, 14),
    new Letter(letter['a'], 160, 153, 8, 11),
    new Letter(letter['e'], 170, 153, 8, 11),
    new Letter(letter['l'], 180, 152, 8, 14),
    new Letter(letter['m'], 192, 153, 13, 11),
    new Letter(letter['r'], 205, 153, 8, 11),
    new Letter(letter['d'], 215, 152, 8, 14),
    new Letter(letter['y'], 225, 155, 8, 14),
    new Letter(letter['n'], 235, 153, 8, 11),
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
  slingshot.show();
  rafo.show();
}


