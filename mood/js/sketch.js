/*
  Author: Tenaimi Okurude 
  Date: 02/03/2017
*/

/* Initialize an array variable colourList */
var colorList = [];
/* create a variable colourPick */
var colourPick;
/* initialize the number of balls to be pushed into the ballObjects Array */
var numOfballObjects = 15;
/* create an array to hold the ballObjects */
var balls = [];

function initializeSetup(){
  for(var i = 0; i < numOfballObjects; i++){
    balls.push(new ballObjects(windowWidth/2, windowHeight/2,
      random(50), random(1)));
  }
  for(var i = 0; i < 100; i++){
    colorList.push(color(Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(255)), Math.floor(random(100))));
  }
  /* Default colour picked randomly and set to the variable colourPick */
  colourPick = color(Math.floor(random(255)), Math.floor(random(255)));
  /* setInterval function to choose a random colour from the array every 1500 milliSeconds(1.5 Second)*/
  setInterval( function(){
      /* set colour pick to a random colourList array element every 1.5 second */
      colourPick = colorList[Math.floor(Math.random()*colorList.length)];
  },
  5500);
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
  background(colourPick);
  /* set text font to 30px */
  for(var i = 0; i < balls.length; i++){
    balls[i].show();
    balls[i].move();
    if(balls[i].getXPos() > windowWidth || balls[i].getXPos() <= 0){
      balls.splice(i, 1);
      balls.push(new ballObjects(random(windowWidth), random(windowHeight),
          random(40), random(2)));
    }
    if(balls[i].getYPos() > windowHeight || balls[i].getYPos() <= 0){
      balls.splice(i, 1);
      balls.push(new ballObjects(random(windowWidth), random(windowHeight),
        random(30), random(2)));
    }
  }
}
