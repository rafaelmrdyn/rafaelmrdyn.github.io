class Letter {
    constructor(letterImg, x, y, w, h) {
      const options = {
        restitution: 0.5
      };
      this.body = Matter.Bodies.rectangle(x, y, w, h, options);
      Matter.World.add(world, this.body);
      Matter.Body.setStatic(this.body, true);
      this.w = w;
      this.h = h;
      this.letterImg = letterImg;
    }
  
    show() {
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(255);
      rectMode(CENTER);
      imageMode(CENTER);
      image(this.letterImg, 0, 0, this.w, this.h);
      pop();
    }
  }
  