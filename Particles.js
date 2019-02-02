const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
ctx.translate(cvs.width/2, cvs.height/2);
let stars = [];
let out = false;


function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Star{
  constructor(){
    this.x = Math.random() * (cvs.width/2 - (-cvs.width/2)) + (-cvs.width/2);
    this.y = Math.random() * (cvs.height/2 - (-cvs.height/2)) + (-cvs.height/2);
    this.z = cvs.width;
    this.sx = 0;
    this.sy = 0;
    this.kx = 0.001;
    this.ky = 0.009;
  }


  update(){
    this.z = this.z/1.005;
    this.kx += 0.00454;
    this.ky += 0.00594;
  }

  create(){
    ctx.beginPath();
    ctx.fillStyle = "gray";
    this.sx = map(this.x/this.z , -1 , 1 , -cvs.width/2 , cvs.width/2);
    this.sy = map(this.y/this.z, -1 , 1 , -cvs.height/2 , cvs.height/2);

    if(Math.abs(this.sx) <= cvs.width/2 || Math.abs(this.sy) <= cvs.height/2){
      ctx.beginPath();
      ctx.ellipse(this.sx , this.sy , this.kx ,this.ky, this.x + this.y , 0 , 2* Math.PI);
      ctx.fill();
      ctx.closePath();

  }
  else{
    out = true;
    }
  }
}

function initialize(){
  for(i = 0; i < 500 ; i++){
    stars[i] = new Star();
    }
}

initialize();

function draw(){
  for(i=0 ; i < stars.length ; i++){
    stars[i].update();
    stars[i].create();
    if(out){
      stars[i] = new Star();
      out = false;
    }
  }
}
draw();

setInterval(function(){
  for(i=0 ; i < stars.length ; i++)
  ctx.clearRect(-cvs.width/2, -cvs.height/2,cvs.width , cvs.height);
  draw();
},1);
