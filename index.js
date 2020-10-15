// $(function(){
//   $(window).resize(function(){
//   });
// });

// let bg = ;
//Declares Variable
const mapWidth = 5000;
const mapHeight = 5000;
let player = {x: 0, y: 0, realX: 0, realY: 0, width: 200, height: 200, speed: 20};
let map = {x: 1000, y: 500, realX: 0, realY: 0, width:mapWidth, height: mapHeight};
let keys = {up: false, down: false, left: false, right: false};
let horizontalBorders = [{x: 0, y1: 0, y2: map.height}, {x: map.width, y1: 0, y2: map.height}];
let verticalBorders = [{y: 0, x1: 0, x2: map.width}, {y: map.height, x1: 0, x2: map.width}];
let houses = [];
let houseTypes = [];

// sprite images
let playerFront;
let playerFrontWalking;
let playerBack;
let playerBackWalking;
let playerLeft;
let playerLeftWalking;
let playerRight;
let playerRightWalking;
let currentPlayer;
let treeric;
let tree1;
let tree2;
let grass;
let rock;

// intervals for walking animation
let animationIntervalLeft;
let animationIntervalRight;
let animationIntervalFront;
let animationIntervalBack;
// let playerBack = loadImage('sprites/playerback.png');
// let playerFrontWalking = loadImage('sprites/playerfrontWalking.png');


function setup() {

  playerFront = loadImage('sprites/playerfront.png');
  playerFrontWalking = loadImage('sprites/playerfrontwalking.png');
  playerBack = loadImage('sprites/playerback.png');
  playerBackWalking = loadImage('sprites/playerbackwalking.png');
  playerLeft = loadImage('sprites/playerleft.png');
  playerLeftWalking = loadImage('sprites/playerleftwalking.png');
  playerRight = loadImage('sprites/playerright.png');
  playerRightWalking = loadImage('sprites/playerrightwalking.png');
  currentPlayer = playerFront;
  treeric = loadImage('');
  grass = loadImage('');
  rock = loadImage('');

  //Check if image exists
  let houseNumber = 1;
  let tempSprite;
  do{
    tempSprite = new Image();
    tempSprite.src = "sprites/house"+houseNumber+".png";
    houseTypes.push(loadImage("sprites/house"+houseNumber+".png"));
  } while(typeof tempSprite != undefined)


  bg = color(29, 17, 69);
  createCanvas(2000, 1000);

  //Generate Houses
  for(let i = 0; i < 10; i++){
    let houseSize = 400;
    let xCoordinates = map.x + Math.random() * (map.width - houseSize);
    let yCoordinates = map.y + Math.random() * (map.height - houseSize);
    console.log("random: "+yCoordinates);
    let newHouse = {realX: xCoordinates, realY: yCoordinates, width: houseSize, height: houseSize, img: Math.floor(Math.random()*3)};
    houses.push(newHouse);
  }


}

function keyPressed(){
  let i = true;
  switch(keyCode){
    case LEFT_ARROW:
    case 65:
      keys.left = true;
      i = true;
      animationIntervalLeft = setInterval(function(){
        currentPlayer = i?playerLeft:playerLeftWalking;
        i = !i;
      }, 200);
      break;
    case RIGHT_ARROW:
    case 68:
      keys.right = true;
      i = true;
      animationIntervalRight = setInterval(function(){
        currentPlayer = i?playerRight:playerRightWalking;
        i = !i;
      }, 200);
      break;
    case UP_ARROW:
    case 87:
      keys.up = true;
      i = true;
      animationIntervalBack = setInterval(function(){
        currentPlayer = i?playerBack:playerBackWalking;
        i = !i;
      }, 200);
      break;
    case DOWN_ARROW:
    case 83:
      keys.down = true;
      i = true;
      animationIntervalFront = setInterval(function(){
        currentPlayer = i?playerFront:playerFrontWalking;
        i = !i;
      }, 200);
      break;
  }
}

function keyReleased(){
  switch(keyCode){
    case LEFT_ARROW:
    case 65:
      keys.left = false;
      clearInterval(animationIntervalLeft);
      currentPlayer = playerLeft;
      break;
    case RIGHT_ARROW:
    case 68:
      keys.right = false;
      clearInterval(animationIntervalRight);
      currentPlayer = playerRight;
      break;
    case UP_ARROW:
    case 87:
      keys.up = false;
      clearInterval(animationIntervalBack);
      currentPlayer = playerBack;
      break;
    case DOWN_ARROW:
    case 83:
      keys.down = false;
      clearInterval(animationIntervalFront);
      currentPlayer = playerFront;
      break;
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  rectMode(CENTER);
  background(color(29, 17, 69));
  drawMap();
  drawHouses();
  drawPlayer();
  drawGUI();
}

function drawGUI(){
  textSize(30);
  // textStroke(5);
  strokeWeight(1);
  // text('Press [Enter] to interact', 0, 30);
}

function drawMap(){
  rectMode(CORNER);
  noFill();
  stroke(0);
  strokeWeight(5);
  map.realX =  width/2 - player.x;
  map.realY =  height/2 - player.y;
  rect(map.realX, map.realY, map.width, map.height);
}

function drawPlayer(){
  fill(255);
  stroke(255);
  rectMode(CENTER)
  imageMode(CENTER);

  // if()

  //works here
  // rect(width/2, height/2, player.width, player.height);
  // console.log("player width: "+player.width);
  //doesn't work
  image(currentPlayer, width/2, height/2, player.width, player.height);
  // rect(windowWidth/2, windowHeight/2, player.width, player.height);
  let slowSpeed = Math.sqrt(Math.pow(player.speed, 2) / 2);
  // console.log("Player X:"+player.x);
  // console.log("Player Y:"+player.y);
  // console.log("Map X:"+map.realX);
  // console.log("Map Y:"+map.realY);

  if(keys.left){
    if(!keys.up && !keys.down){
      player.x -= player.speed;
    } else if(keys.up && !keys.right) {
      player.x -= slowSpeed;
      player.y -= slowSpeed;
    } else if(keys.down && !keys.right){
      player.x -= slowSpeed;
      player.y += slowSpeed;
    } else if(keys.up && keys.right){
      player.y -= player.speed;
    }


  }

  if(keys.right){
    if(!keys.up && !keys.down){
      player.x += player.speed;
    } else if(keys.up && !keys.left) {
      player.x += slowSpeed;
      player.y -= slowSpeed;
    } else if(keys.down  && !keys.left){
      player.x += slowSpeed;
      player.y += slowSpeed;
    } else if(keys.up && keys.left){
      player.y += player.speed;
    }
  }
  if(keys.up && !keys.left && !keys.right){
    player.y -= player.speed;
  }
  if(keys.down && !keys.left && !keys.right){
    player.y += player.speed;
  }
  checkBorders();
}

function checkBorders(){
  if(player.x - player.width/2 < 0){
    player.x =  player.width/2;
  } else if(player.x + player.width/2 > map.width){
    player.x = map.width - player.width/2;
  }
  if(player.y - player.height/2 < 0){
    player.y = player.height/2;
  } else if(player.y + player.height/2 > map.height){
    player.y = map.height - player.height/2;
  }
}

function drawHouses(){
  houses.forEach(function(e, i){
    // console.log(/JSON.stringify(e));
    fill(100);
    stroke(100);
    image(houseTypes[e.img], e.realX - player.x, e.realY - player.y, e.width, e.height);
    // rect(e.realX - player.x, e.realY - player.y, e.width, e.height);
  });
}
