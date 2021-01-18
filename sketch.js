
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var bg, bgImage;
var ground;
const PLAY = 1;
const END = 2;
var gameState = PLAY;
var touched = 0;
var sizeScore = 0;
function preload(){
  
  
  monkey_running = loadAnimation("images/sprite_0.png","images/sprite_1.png","images/sprite_2.png","images/sprite_3.png","images/sprite_4.png","images/sprite_5.png","images/sprite_6.png","images/sprite_7.png","images/sprite_8.png")
  
  bananaImage = loadImage("images/banana.png");
  obstacleImage = loadImage("images/obstacle.png");
  bgImage = loadImage("images/jungle.jpg");
 
}



function setup() {
  createCanvas(400, 400);
  
 /* bg = createSprite(400, 200, 20, 20);
  bg.addImage(bgImage);
  bg.velocityX = 0;
  bg.width = 5000;
  bg.scale = 800/1003;
  bg.x = 2500;*/
  
  
  monkey = createSprite(100, 320, 200, 200);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.velocityX = 1;
  
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = 0;
  ground.x = ground.width/2;
  ground.width = 5000;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
  background("green");
  if (gameState === PLAY){
    monkey.collide(ground);
  
    if(keyDown("space") && monkey.velocityY === 0){
      monkey.velocityY = -12;
    }
    monkey.velocityY += 0.6;
    
    if (foodGroup.isTouching(monkey)){
      score += 2;
      sizeScore += 1;
      foodGroup.destroyEach();
    }
  
  
    spawnBanana();
    spawnObstacles();
    monkeySize();
    drawSprites();
    drawScore();
  
  } else if (gameState === END){
    obstacleGroup.destroyEach();
    monkey.destroy();
    foodGroup.destroyEach();
    bg.destroy();
    stroke("yellow")
    textSize(33);
    text("You lose!!", camera.position.x, 190);
  }

  camera.position.x = monkey.x;
}

function spawnBanana() {
  if (frameCount%80 === 0){
    banana = createSprite(400, 70, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.y = Math.round(random(120, 200))
    banana.x = monkey.x + 200;
    banana.lifetime = 400/7;
    banana.velocityX = -7;
    
    foodGroup.add(banana);
  }
  
}

function spawnObstacles(){
  
  if (frameCount%300 === 0){
    obstacle = createSprite(400, monkey.x + 200, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 400/7
    
    obstacleGroup.add(obstacle);
  }
}

function drawScore(){
  textSize(20);
  fill("white");
  text("Score: " + score, camera.position.x - 120, 50);
  
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, camera.position.x + 20, 50);
  
}

function monkeySize(){
  if (touched === 0 ){
    // after every 10 points scored, the monkeys size increases by 10%
    monkey.scale = 0.1 + sizeScore/100;
    
    if (obstacleGroup.isTouching(monkey)){
      touched++;
      sizeScore = 0;
      obstacleGroup.destroyEach();
    }
  }
  
  if (touched === 1){
    monkey.scale = 0.1;
    monkey.scale = 0.1 + sizeScore/100;
    if (obstacleGroup.isTouching(monkey)){
      touched++;      
    }
  }
  if (touched === 2){
    gameState = END;
    
  }
}

 