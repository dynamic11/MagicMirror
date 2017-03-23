function ballObjects(x, y, size, speed){
  this.x = x;
  this.y = y;
  this.s = size;
  this.colour = color(random(255), random(255), random(255), random(255));
  this.speed = random(-speed, speed);

  this.show = function(){
    noStroke();
    fill(this.colour);
    ellipse(this.x, this.y, this.s, this.s);
  }

  this.move = function(){
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;
  }

  this.getXPos = function() {
    return this.x;
  }

  this.getYPos = function() {
    return this.y;
  }

}
