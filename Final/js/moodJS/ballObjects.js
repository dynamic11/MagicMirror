function ballObjects(x, y, size, speed, animation){
  this.x = x;
  this.y = y;
  this.s = size;
  this.colour = "fff";//color(random(255), random(255), random(255));
  this.animation=animation;
  this.directionPattern=Math.ceil(random(0,4))

  //If floating animation is selected a random speed is selected between
  //-speed and speed. small values are avoided to prevent stationary dots
  if(animation==4){
    do{
      this.speed = random(-speed, speed);
    }while(this.speed <0.5 && this.speed >-0.5)
  //if FireFly is selected a random x and y speed are chosen to make the 
  //balls move in random directions from center
  }else if(animation==5){
    do{
      this.speedx=random(-4, 4);
      this.speedy=random(-4, 4);
    }while(this.speed <3 && this.speed >-3)
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
    switch (animation){
      //Bubbles
      case 1:
        this.x = this.x ;
        this.y = this.y - this.speed;
        break;
      //Rain
      case 2:
        this.x = this.x;
        this.y = this.y + this.speed;
        break;
      //In The Wind
      case 3:
        this.x = this.x + this.speed;
        this.y = this.y - this.speed;
        break;
      //Floating
      case 4:
        this.x = this.x + this.speed;
        this.y = this.y + this.speed;
        break;
      //Firefly
      case 5:
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
    }
  }

  this.getXPos = function() {
    return this.x;
  }

  this.getYPos = function() {
    return this.y;
  }

}
