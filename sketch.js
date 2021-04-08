const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balloon , balloonPosition ,height, balloonIMG;
var backGroundIMG;
var database ;

function preload()
{
	balloonIMG=loadImage("images/hab.png")
	backgroundIMG=loadImage("images/bg.png")
}


function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addImage("hotAirBalloon",balloonIMG);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(backgroundIMG);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon" , balloonIMG);
    balloon.scale = balloon.scale -0.005;
  
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon" , balloonIMG);
    balloon.scale = balloon.scale + 0.005;
  }

  drawSprites();
  
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}