const Engine= Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var myEngine, myWorld;
var bg;
var ground;
var boggie1,boggie2,boggie3;
var chain1;
var trainSound 
var crashSound
var flag = 0;

function preload(){
  bg= loadImage("bg.jpg");
  trainSound = loadSound("train.mp3");
  crashSound = loadSound("train_crossing.mp3");
}
function setup() {
  createCanvas(1200,400);
  myEngine = Engine.create();
  world = myEngine.world;

  ground = new Ground(600,380,1200,20);
  coach = new Train(200,300,140,100);
  coach1 = new Train(375,300,140,100);
  coach2 = new Train(550,300,140,100);

  chain = new SlingShot(coach.body, coach1.body);
  chain1 = new SlingShot(coach1.body, coach2.body);

  rock = new Rock(1000,370,200,200);
}

function draw() {
  background(bg);  
  Engine.update(myEngine);

  ground.display();
  
  chain.display();
  chain1.display();

  coach.display();
  coach1.display();
  coach2.display();

  rock.display(); 
  var collison = Matter.SAT.collides(coach2.body,rock.body);
  if(collison.collided){
    flag=1;
  }
  if(flag===1){
    textSize(30);
    stroke(3);
    fill('blue');
    text("CRASH",500,200);
    crashSound.play();
  }
}

function keyPressed(){
  if(keyCode===RIGHT_ARROW){
    Matter.Body.applyForce(coach2.body, {x: coach2.body.position.x, y: coach2.body.position.y}, {x: 1, y:0} );
    trainSound.play();
  }
}