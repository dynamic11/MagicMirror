function ballObjects(x, y, size, speed, animation){
  this.x = x;
  this.y = y;
  this.s = size;
  this.colour = "fff";//color(random(255), random(255), random(255));
  this.animation=animation;
  this.directionPattern=Math.ceil(random(0,4))
  if(animation==4){
    do{
      this.speed = random(-speed, speed);
    }while(this.speed <0.5 && this.speed >-0.5)
  }else if(animation==5){
    this.speedx=random(0.5, 5);
    this.speedy=random(0.5, 5);
    this.s=25;
  }else{
    this.speed = random(0.5, speed);
  }
  

  this.show = function(){
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, this.s, this.s);
  }

  this.move = function(){
    if (animation==1){
      this.x = this.x ;
      this.y = this.y - this.speed;
    }else if(animation==2){
      this.x = this.x;
      this.y = this.y + this.speed;
    }else if (animation==3){
      this.x = this.x + this.speed;
      this.y = this.y - this.speed;
    }else if (animation==4){
      this.x = this.x + this.speed;
      this.y = this.y + this.speed;
    }else if (animation==5){
      if(this.directionPattern==1){
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
      }else if(this.directionPattern==2){
        this.x = this.x + this.speedx;
        this.y = this.y - this.speedy;
      }else if(this.directionPattern==3){
        this.x = this.x - this.speedx;
        this.y = this.y + this.speedy;
      }else if(this.directionPattern==4){
        this.x = this.x - this.speedx;
        this.y = this.y - this.speedy;
      }
    }
  }

  this.getXPos = function() {
    return this.x;
  }

  this.getYPos = function() {
    return this.y;
  }

}
