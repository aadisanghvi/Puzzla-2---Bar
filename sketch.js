//aadi
// canvas 1 variables
var moveBoxX;
var moveBoxY;
var stateOfBox;

// canvas 2 variables
var beer;
var moveBeerStartX;
var moveBeerStartY;
var moveBeerEndX;
var moveBeerEndY;
var mirror;
var screwdriver;
var bar;
var beerLocation;
var canvasNum;

function preload() {
  beer = loadImage('https://dl.dropboxusercontent.com/s/6k851d30ttx3wyr/beeer.png?dl=0');
  mirror = loadImage('https://dl.dropboxusercontent.com/s/jc6ntv1kj5jwbk2/mirror.png');
  screwdriver = loadImage('https://dl.dropboxusercontent.com/s/90dqrm17fsao9oh/screwdriver.jpeg');
  bar = loadImage('https://dl.dropboxusercontent.com/s/gj0iaaaj70wk3hw/BlueBar_3.jpg');
  
}


function setup()
{
    createCanvas(800,600);
  
    // canvas 1 variables
    moveBoxX = 50;
    moveBoxY = 85;
    stateOfBox = 1;

    // marks the location of the beer
    // 1 - is original location
    // 2 - beer is in transition
    // 3 - beer is in user location
    beerLocation = 1;
  
    // starting and ending locations of the beer
    moveBeerStartX = 230;
    moveBeerStartY = 270;
    moveBeerEndX = 40;
    moveBeerEndY = 535;
  
    // which canvas is in focus by default
    canvas = 3;
}

function draw()
{
    if (canvas == 1)
    {
        canvas1();
    }
    else if (canvas == 2)
    {
        canvas2();
    }
    else if (canvas == 3)
    {
        canvas3();
    }
    else
    {
        canvas = 1;
    }
    paintCanvasButtons();
}

// Canvas 1 demonstrates a moving rectangle controlled by a button
function canvas1()
{
  background(125,125,125);
  
  // Block 1
  // Try clicking on the button after it moves to it's final destination
  // 
  // if state of box is 1 then the box is stationary
  if (stateOfBox == 1)
  {
    // draw box at default location
    moveBoxX = 50;
    moveBoxY = 85;
    fill(255,255,255);
    rect(moveBoxX,moveBoxY,50,50);
  }
  // if state of box is 2 then the box is moving from left to right
  else if (stateOfBox == 2)
  {
    // draw box
    fill(255,255,255);
    rect(moveBoxX,moveBoxY,50,50);
    
    // move box to the right by increasing the x value of it
    moveBoxX = moveBoxX + 2;
    
    // if the x value is beyond a domain change the state of the box
    // to stationary
    if (moveBoxX > 400)
    {
      moveBoxX = 400;
      stateOfBox = 3;
    }
  }
  else if (stateOfBox == 3)
  {
    // draw box at destination location
    moveBoxX = 400;
    moveBoxY = 85;
    fill(255,255,255);
    rect(moveBoxX,moveBoxY,50,50); 
  }
  
  
  // Block 2
  // if you move your mouse over the 'move' button
  if (mouseX > 50 && mouseX < 50+100 && mouseY > 150 && mouseY < 150+50)
  {
    // Darker Green Button
    fill(15,139,11);
    rect(50,150,100,50);
    if (mouseIsPressed == true)
    {
      // Red Button
      fill(255,50,50);
      rect(50,150,100,50);
      stateOfBox = 2;
    }
  }
  else
  {
    // Lighter Green Button
    fill(100,255,50);
    rect(50,150,100,50);
  }
  
  
  // label the move button
  fill(0,0,0);
  text("move white",65,171);
  text("box right",65,188);

}

function canvas2()
{
  background(125,125,125);
  
  text("Move your mouse over the green areas and see the cursor change",50,110);
  
  
  
  circle1D = sqrt((mouseX - 250)*(mouseX - 250)+(mouseY - 175)*(mouseY - 175));

  
  // situation 1
  // mouse is over rectangle
  // draw a darker rectangle and draw a lighter circle
  // change mouse cursor
  if (mouseX > 50 && mouseX < 50+100 && mouseY > 150 && mouseY < 150+50)
  {
    // Darker Green Rectangle
    fill(15,139,11);
    rect(50,150,100,50);
    
    // Lighter Green Circle
    fill(100,255,50);
    ellipse(250,175,100,100);
    
    
    if (mouseIsPressed == true)
    {
      // Red Button
      fill(255,50,50);
      rect(50,150,100,50);
      stateOfBox = 2;
    }
    
    // change cursor to hand
    cursor(HAND);
  }
  // mouse is over circle
  // draw a darker circle and draw a lighter rectangle
  // change mouse cursor
  else if (circle1D < 50)
  {
    // Darker Green Circle
    fill(15,139,11);
    ellipse(250,175,100,100);
    
    // Lighter Green Rectangle
    fill(100,255,50);
    rect(50,150,100,50);
    
    if (mouseIsPressed == true)
    {
      // Red Button
      fill(255,50,50);
      ellipse(250,175,100,100);
      stateOfBox = 2;
    }

    // Define our own cursor
    // Because the image is defined by the top left X,Y
    // coordinates we must shift the image by half it's
    // length and height to center it on our cursor
    noCursor();
    image(beer,mouseX-300/9/2,mouseY-300/9/2,300/9,300/9);
  }
  // Mouse is not over either rectangle or circle
  // Therefore we must draw both and show an arrow mouse cursor
  else
  {
    // Lighter Green Rectangle
    fill(100,255,50);
    rect(50,150,100,50);
    
    // Lighter Green Circle
    fill(100,255,50);
    ellipse(250,175,100,100);
    
    // default cursor to arrow
    cursor(ARROW);
  }
  
  // label for rectangle
  fill(0,0,0);
  text("move mouse",65,171);
  text("over me",65,188);

  // label the circle button
  fill(0,0,0);
  text("move mouse",215,171);
  text("over me",215,188);
  
}

function canvas3()
{
   background(255,255,255);
  

  
   image(bar,0,0);
   itemGrid();

   fill(0,0,0);
   text("Click on the beer to see what happens!",110,120);
  
   // if beerlocation is 1 draw the beer in the original locaiton
   if (beerLocation == 1)
   {
     moveBeerStartX = 230;
     moveBeerStartY = 270;
     image(beer,moveBeerStartX,moveBeerStartY,300/9,300/9);
   }
   // if beerLocation is 2 then the beer is in transit from original location to being in the "user's bag"
   else if (beerLocation == 2)
   {
     image(beer,moveBeerStartX,moveBeerStartY,300/9,300/9);

     // move the beer from the starting point to the ending point
     if (moveBeerStartX > moveBeerEndX)
     {
       moveBeerStartX = moveBeerStartX - 5;
     }
     if (moveBeerStartY < moveBeerEndY)
     {
       moveBeerStartY = moveBeerStartY + 7;
     }
     if (!(moveBeerStartX > moveBeerEndX && moveBeerStartY < moveBeerEndY))
     {
       beerLocation = 3;
     }
   }
  else if (beerLocation == 3)
  {
    
    image(beer,moveBeerEndX,moveBeerEndY,300/9,300/9);
  }

   if (mouseX > 230 && mouseX < 230+300/9 && mouseY > 270 && mouseY < 270+300/9)
   {
     cursor(HAND);
     if (mouseIsPressed == true && beerLocation == 1)
     {
       beerLocation = 2;
     }
   }
   else
   {
     cursor(ARROW);
   }
}

function itemGrid()
{
  // background for item grid
  fill(50,50,50);
  rect(10,510,800-20,600-20);
  
  // left most box
  fill(125,125,125);
  rect(20,520,70,70);

  // middle most box
  fill(125,125,125);
  rect(20+80,520,70,70);

  // right most box
  fill(125,125,125);
  rect(20+80*2,520,70,70);

}

function paintCanvasButtons()
{
   myX = -25;
   myY = -275;
  

   // Canvas 1 button
   if (canvas == 1)
   {
     strokeWeight(5);
   }
   else
   {
     strokeWeight(1);
   }
   fill(255,255,255);
   rect(myX+50,myY+300,100,50);
   fill(0,0,0);
   text("Canvas 1",myX+73,myY+330);

   // Canvas 2 button
   if (canvas == 2)
   {
     strokeWeight(5);
   }
   else
   {
     strokeWeight(1);
   }
   fill(255,255,255);
   rect(myX+170,myY+300,100,50);
   fill(0,0,0);
   text("Canvas 2",myX+195,myY+330);

   // Canvas 3 button
   if (canvas == 3)
   {
     strokeWeight(5);
   }
   else
   {
     strokeWeight(1);
   }
   fill(255,255,255);
   rect(myX+290,myY+300,100,50);
   fill(0,0,0);
   text("Canvas 3",myX+315,myY+330);
22
   if (mouseX > myX+50 && mouseX < myX+50+100 && mouseY > myY+300 && mouseY < myY+300+50 && mouseIsPressed)
   {
     canvas = 1;
     stateOfBox = 1;
   }
  
   if (mouseX > myX+170 && mouseX < myX+170+100 && mouseY > myY+300 && mouseY < myY+300+50 && mouseIsPressed)
   {
     canvas = 2;
   } 

   if (mouseX > myX+290 && mouseX < myX+290+100 && mouseY > myY+300 && mouseY < myY+300+50 && mouseIsPressed)
   {
     canvas = 3;
     beerLocation = 1;
   }

}




