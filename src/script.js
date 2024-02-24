//dir  : 0-xSplit 1-ySplit
//level: tree level
class Rect{
  constructor(x, y, w, h, dir=0, level=0, hue=random()){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.dir = dir;
    this.level = level;
    this.hue = hue-random(-.2, .2);
    if (this.hue < 0) this.hue += 1;
    if (this.hue > 1) this.hue -= 1;
    this.bal = random(.2, 1);
    this.children = [];
    this.r = random();
  }
  split(){
    let {x, y, w, h, dir, level} = this;
    if (level > 7) return;
    
    //prime factorization of 10000 is 2^4 x 5^4
    let numSplits = level < 4 ? 2 : 5;
    
    let w2 = dir == 0 ? w/numSplits : w;
    let h2 = dir == 0 ? h : h/numSplits;
    
    for (let i = 0; i < numSplits; i++){
      let x2 = dir == 0 ? x+w2*i : x;
      let y2 = dir == 0 ? y : y+h2*i;
      let child = new Rect(x2, y2, w2, h2, (dir+1)%2, level+1, this.hue);
      child.split();
      this.children.push(child);
    }
  }
  render(){
    fill(this.hue, 1, 1, this.bal/7);
    let xOff = (mouseX-width /2)*20*this.r*this.level/width;
    let yOff = (mouseY-height/2)*20*this.r*this.level/height;
    rect(this.x+xOff, this.y+yOff, this.w, this.h);
    for (let c of this.children) c.render();
  }
}

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

let r;
let init = () => {
  r = new Rect(0, 0, width, height);
  r.split();
  console.log(r);
}

function draw(){
  blendMode(BLEND);
  background(0);
  if (r){
    blendMode(ADD);
    noStroke();
    r.render();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}

function mouseReleased(){init()}