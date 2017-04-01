/*
  Author: Tenaimi Okurude 
  Date: 02/03/2017
*/

/* Initialize an array variable colourList */
var colorList = [];
/* create a variable colourPick */
var colourPick;
/* initialize the number of balls to be pushed into the ballObjects Array */
var numOfballObjects = 50;
var ballspeed = 1.5;
/* create an array to hold the ballObjects */
var balls = [];
animation = 1;

$.getJSON("http://localhost:8000/js/dashJS/info.json", function(data){
    animation=data.mood;
});
var p=0;

function initializeSetup(){
  fill(255);
  text("Attention, please.", 50, 200);
  text(animation,windowWidth/2,windowHeight/2);
  if(animation==1){
      for(var i = 0; i < numOfballObjects; i++){
        balls.push(new ballObjects(random(windowWidth), windowHeight+20,random(50), ballspeed, animation));
      }
  }else if(animation==2){
      for(var i = 0; i < numOfballObjects; i++){
        balls.push(new ballObjects(random(windowWidth), -20,random(50), ballspeed, animation));
      }
  }else if(animation==3){
      for(var i = 0; i < numOfballObjects; i++){
        balls.push(new ballObjects(random(windowWidth), windowHeight,random(50), ballspeed, animation));
      }
  }else if(animation==4){
    for(var i = 0; i < numOfballObjects; i++){
        balls.push(new ballObjects(random(windowWidth), random(windowHeight),random(50), ballspeed, animation));
      }
  }else if(animation==5){
    for(var i = 0; i < numOfballObjects; i++){
        balls.push(new ballObjects(windowWidth/2, windowHeight/2,random(50), ballspeed, animation));
      }
  }
  // for(var i = 0; i < 100; i++){
  //   colorList.push(color(Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(100))));
  // }
  /* Default colour picked randomly and set to the variable colourPick */
  //colourPick = color(Math.floor(random(255)), Math.floor(random(255)));
  /* setInterval function to choose a random colour from the array every 1500 milliSeconds(1.5 Second)*/
  //setInterval( function(){
      /* set colour pick to a random colourList array element every 1.5 second */
      //colourPick = colorList[Math.floor(Math.random()*colorList.length)];
  //},
  //5500);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  /* Loop to add 100 random colours into the colorList array */
  initializeSetup();
}

 /* function to handle various scrren size so it looks good on any device */
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  /* Set body background to colourPick */
  background("#000");
  p++;

  if(p<100){
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    switch(animation){
      case 1:
        text("Bubbles",windowWidth/2,windowHeight/2);
        break;
      case 2:
        text("Rain",windowWidth/2,windowHeight/2);
        break;
      case 3:
        text("In The Wind",windowWidth/2,windowHeight/2);
        break;
      case 4:
        text("Floating",windowWidth/2,windowHeight/2);
        break;
      case 5:
        text("Firefly",windowWidth/2,windowHeight/2);
        break;
    }
  }
  //animation=Math.floor((Math.random() * 2) + 1);
  /* set text font to 30px */
  for(var i = 0; i < balls.length; i++){
    balls[i].show();
    balls[i].move();

    if(balls[i].getXPos() > windowWidth+50||
       balls[i].getXPos() <= -50 || 
       balls[i].getYPos() > windowHeight+50|| 
       balls[i].getYPos() <= -50 ){

      balls.splice(i, 1);
      if(animation==1){
        balls.push(new ballObjects(random(windowWidth), windowHeight+20,random(50), ballspeed, animation));
      }else if(animation==2){
        balls.push(new ballObjects(random(windowWidth), -20,random(50), ballspeed, animation));
      }else if(animation==3){
        balls.push(new ballObjects(random(windowWidth+45), windowHeight,random(50), ballspeed, animation));
      }else if(animation==4){
        balls.push(new ballObjects(random(windowWidth), random(windowHeight) ,random(50), ballspeed, animation));
      }else if(animation==5){
        balls.push(new ballObjects(windowWidth/2, windowHeight/2,random(50), ballspeed, animation));
      }
    }
  }
}
