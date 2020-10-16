// $(function(){
//   $(window).resize(function(){
//   });
// });

// let bg = ;
//Declares Variable
const mapWidth = 5000;
const mapHeight = 5000;
let player = {x: 0, y: 0, realX: 0, realY: 0, width: 200, height: 200, speed: 20, candy: {shittles: 0, gandgs: 0, himhes: 0, lollipop: 0, sugar: 0}};
let map = {x: 1000, y: 500, realX: 0, realY: 0, width:mapWidth, height: mapHeight};
let keys = {up: false, down: false, left: false, right: false};
let horizontalBorders = [{x: 0, y1: 0, y2: map.height}, {x: map.width, y1: 0, y2: map.height}];
let verticalBorders = [{y: 0, x1: 0, x2: map.width}, {y: map.height, x1: 0, x2: map.width}];

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

//houses
let house1;
let house2;
let house3;
let houses = [];

// nature shit
let tree1;
let tree2;
let trees = [];
let grass;
let rock;
let leaf1;
let leaf2;
let leaf3;
let leaf4;
let nature = [];
let gravestone1;
let gravestone2;
let jackolantern1;
let jackolantern2;
let jackolantern3;
// let currentjackolantern;

//candy
let lollipop;
let gandgs;
let shittles;
let sugar;
let himhes;

// intervals for walking animation
let animationIntervalLeft;
let animationIntervalRight;
let animationIntervalFront;
let animationIntervalBack;
let animationjackolantern;
let houseInRange = false;
let enterPressed = false;

//timer
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
  tree1 = loadImage('sprites/tree1.png');
  tree2 = loadImage('sprites/tree2.png');
  grass = loadImage('sprites/grass.png');
  rock = loadImage('sprites/rock.png');
  house1 = loadImage('sprites/house1.png');
  house2 = loadImage('sprites/house2.png');
  house3 = loadImage('sprites/house3.png');
  // let lollipop;
  // let gandgs;
  // let shittles;
  // let sugar;
  // let himhes;
  lollipop = loadImage('sprites/lollipop.png');
  gandgs = loadImage('sprites/gandgs.png');
  shittles = loadImage('sprites/shittles.png');
  sugar = loadImage('sprites/sugar.png');
  himhes = loadImage('sprites/himhes.png');
  gravestone1 = loadImage('sprites/gravestone1.png');
  gravestone2 = loadImage('sprites/gravestone2.png');
  leaf1 = loadImage('sprites/leaf1.png');
  leaf2 = loadImage('sprites/leaf2.png');
  leaf3 = loadImage('sprites/leaf3.png');
  leaf4 = loadImage('sprites/leaf4.png');
  jackolantern1 = loadImage('sprites/jackolantern1.png');
  jackolantern2 = loadImage('sprites/jackolantern2.png');
  jackolantern3 = loadImage('sprites/jackolantern3.png');

  //Check if image exists
  let houseNumber = 1;
  let tempSprite;
  // console.log("image: "+JSON.stringify(houseTypes[0]));


  bg = color(29, 17, 69);
  createCanvas(2000, 1000);

  //Generate Houses
  // let houseSize;
  for(let i = 0; i < 20; i++){
    let houseSize = 400;
    let inRange = false;

    let xCoordinates;
    let yCoordinates;
    do{
      xCoordinates = map.x + Math.random() * (map.width - houseSize * 2) + houseSize;
      yCoordinates = map.y + Math.random() * (map.height - houseSize * 2) + houseSize;

      let tempXmin = 0;
      let tempYmin = 0;
      let tempXmax = 0;
      let tempYmax = 0;

      inRange = false;
      houses.forEach(function(e){
        tempXmin = e.realX - 400;
        tempXmax = e.realX + 400;
        tempYmin = e.realY - 400;
        tempYmax = e.realY + 400;
        // console.log(""+)
        if(xCoordinates > tempXmin && yCoordinates > tempYmin && xCoordinates < tempXmax && yCoordinates < tempYmax){
          inRange = true;
          // console.log("in range");
        } else {
          // console.log("x:" + xCoordinates+", y:" + yCoordinates);
          // console.log("tempx:" + tempXmin+", tempy:" + tempYmin);
        }
      });
    }while(inRange);

    let newHouse = {realX: xCoordinates, realY: yCoordinates, width: houseSize, height: houseSize, imgIndex: Math.floor(Math.random()*3), visited: false, animation: null};
    houses.push(newHouse);
  }

  // for(let i = 0; i < 20; i++){
  //   let xCoordinates = map.x + Math.random() * (map.width - 600) + 300;
  //   let yCoordinates = map.y + Math.random() * (map.height - 600) + 300;
  //   let type = Math.floor(Math.random() * 100);
  //   let newItem = {realX: xCoordinates, realY: yCoordinates, width: 200, height: 200, imgIndex: type};
  //   nature.push(newItem);
  // }

  //Generate Treeees
  for(let i = 0; i < 15; i++){
    let treeSize = 300;
    let inRange = false;

    let xCoordinates;
    let yCoordinates;

    do{
      xCoordinates = map.x + Math.random() * (map.width - treeSize * 2) + treeSize;
      yCoordinates = map.y + Math.random() * (map.height - treeSize * 2) + treeSize;

      let tempXmin = 0;
      let tempYmin = 0;
      let tempXmax = 0;
      let tempYmax = 0;

      inRange = false;
      trees.forEach(function(e){
        tempXmin = e.realX - 500;
        tempXmax = e.realX + 500;
        tempYmin = e.realY - 500;
        tempYmax = e.realY + 500;
        // console.log(""+)
        if(xCoordinates > tempXmin && yCoordinates > tempYmin && xCoordinates < tempXmax && yCoordinates < tempYmax){
          inRange = true;
          // console.log("in range");
        } else {
          // console.log("x:" + xCoordinates+", y:" + yCoordinates);
          // console.log("tempx:" + tempXmin+", tempy:" + tempYmin);
        }
      });
    }while(inRange);

    let newTree = {realX: xCoordinates, realY: yCoordinates, width: treeSize, height: treeSize, imgIndex: Math.floor(Math.random()*100)};
    trees.push(newTree);
  }

  for(let i = 0; i < 300; i++){
    let xCoordinates = map.x + Math.random() * (map.width - 600) + 300;
    let yCoordinates = map.y + Math.random() * (map.height - 600) + 300;
    let type = Math.floor(Math.random() * 100);
    let newItem = {realX: xCoordinates, realY: yCoordinates, width: 200, height: 200, imgIndex: type, init: true};
    nature.push(newItem);
  }


  //

  // console.log(houses[0].width);

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
    case 13:
      if(houseInRange){
        enterPressed = true;
      }
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
    case 13:
      enterPressed = false;
      break;
  }
}

function checkHouseRange(){

  let numHouses = 0;
  houses.forEach(function(e){
      let xDistance = e.realX - player.x - 1000;
      let yDistance = e.realY - player.y - 500;
      if(Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2)) <= 300 && !e.visited){
        textSize(50);
        strokeWeight(1);
        text("Press [Enter] to trick or treat", 1300, 50);
        fill(255);
        houseInRange = true;
        if(enterPressed){
          e.visited = true;
          giveRandomCandy();
        }
      }
  });
  // console.log("Number of houses: "+numHouses);

}

function giveRandomCandy(){
  let choice = Math.floor(Math.random() * 5);
  //candy: {shittles: 0, gandgs: 0, himhes: 0, lollipop: 0, sugar: 0}
  switch(choice){
    case 0:
      player.candy.shittles++;
      break;
    case 1:
      player.candy.gandgs++;
      break;
    case 2:
      player.candy.himhes++;
      break;
    case 3:
      player.candy.lollipop++;
      break;
    case 4:
      player.candy.sugar++;
      break;
  }
  console.log("candy");
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function draw() {

  imageMode(CENTER);
  rectMode(CENTER);
  background(color(29, 17, 69));
  drawMap();
  drawNature();
  drawTrees();
  drawHouses();
  drawPlayer();
  drawGUI();
  checkHouseRange();
}

function drawGUI(){
  // textStroke(5);
  // text('Press [Enter] to interact', 0, 30);
  let textSizeCandy = 200;
  textSize(100);
  strokeWeight(1);

  text(player.candy.gandgs, 10, 100);
  text(player.candy.himhes, 10, textSizeCandy + 100);
  text(player.candy.lollipop, 10, textSizeCandy * 2 + 100);
  text(player.candy.shittles, 10, textSizeCandy * 3 + 100);
  text(player.candy.sugar, 10, textSizeCandy * 4 + 100);
  image(gandgs, textSizeCandy, 100, textSizeCandy, textSizeCandy);
  image(himhes, textSizeCandy, textSizeCandy * 1 + 100, textSizeCandy, textSizeCandy);
  image(lollipop, textSizeCandy, textSizeCandy * 2 + 100, textSizeCandy, textSizeCandy);
  image(shittles, textSizeCandy, textSizeCandy * 3 + 100, textSizeCandy, textSizeCandy);
  image(sugar, textSizeCandy, textSizeCandy * 4 + 100, textSizeCandy, textSizeCandy);

}

function drawMap(){
  rectMode(CORNER);
  noFill();
  //29, 17, 69
  stroke(20, 20, 50);
  strokeWeight(2);
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
  // console.log(JSON.stringify(houses));
  houses.forEach(function(e){
    fill(100);
    stroke(100);
    // console.log("x coordinate:"+ (e.realX - player.x));
    // console.log("y coordinate:"+( e.realY - player.y));
    switch(e.imgIndex){
      case 0:
        image(house1, e.realX - player.x, e.realY - player.y, 500, 500);
        break;
      case 1:
        image(house2, e.realX - player.x, e.realY - player.y, 500, 500);
        break;
      case 2:
        image(house3, e.realX - player.x, e.realY - player.y, 500, 500);
        break;
    }
    // rect(e.realX - player.x, e.realY - player.y, e.width, e.height);
  });
}

function drawTrees(){
  trees.forEach(function(e){
    if(e.imgIndex <= 50){
      image(tree1, (e.realX - player.x), (e.realY - player.y), 500, 500);
    } else if(e.imgIndex <= 100){
      image(tree2, (e.realX - player.x), (e.realY - player.y), 500, 500);
    }
  });
}

function drawNature(){
  nature.forEach(function(e){
    fill(100);
    stroke(100);

    // if(e.imgIndex <= 5){
    //   image(tree1, (e.realX - player.x), (e.realY - player.y), 500, 500);
    // } else if(e.imgIndex <= 10){
    //   image(tree2, (e.realX - player.x), (e.realY - player.y), 500, 500);
    // } else
    if(e.imgIndex < 40){
      image(grass, (e.realX - player.x), (e.realY - player.y), 200, 100);
    } else if(e.imgIndex < 50){
      image(rock, (e.realX - player.x), (e.realY - player.y), 300, 200);
    } else if(e.imgIndex < 55){
      image(gravestone1, (e.realX - player.x), (e.realY - player.y), 200, 100);
    } else if(e.imgIndex < 60){
      image(gravestone2, (e.realX - player.x), (e.realY - player.y), 200, 100);
    } else if(e.imgIndex < 65){
      image(leaf1, (e.realX - player.x), (e.realY - player.y), 300, 200);
    } else if(e.imgIndex < 70){
      image(leaf2, (e.realX - player.x), (e.realY - player.y), 300, 200);
    } else if(e.imgIndex < 75){
      image(leaf3, (e.realX - player.x), (e.realY - player.y), 300, 200);
    } else if(e.imgIndex < 80){
      image(leaf4, (e.realX - player.x), (e.realY - player.y), 300, 200);
    } else if(e.imgIndex < 85){
      if(e.init){
        image(jackolantern1, (e.realX - player.x), (e.realY - player.y), 200, 100);
        e.randomTime = Math.random() * 500 + 200;
        e.jackolanternState = Math.floor(Math.random() * 3);
        switch(e.jackolanternState){
          case 0:
            e.currentjackolantern = jackolantern1;
            break;
          case 1:
            e.currentjackolantern = jackolantern2;
            break;
          case 2:
            e.currentjackolantern = jackolantern3;
            break;
        }
        e.animation = setTimeout(function(){
          setInterval(function(){
              console.log("interval");
              e.currentjackolantern = e.jackolanternState == 0 ? jackolantern1:e.jackolanternState == 1 ?jackolantern2:jackolantern3;
              e.jackolanternState = e.jackolanternState >= 3 ? 0 : e.jackolanternState + 1;
              switch(e.jackolanternState){
                case 0:
                  e.currentjackolantern = jackolantern1;
                  break;
                case 1:
                  e.currentjackolantern = jackolantern2;
                  break;
                case 2:
                  e.currentjackolantern = jackolantern3;
                  break;
              }
              e.randomTime = Math.random() * 500 + 200;
          }, e.randomTime);
        }, 500);
        e.init = false;
      } else {
        image(e.currentjackolantern, (e.realX - player.x), (e.realY - player.y), 200, 100);
      }

    } else if(e.imgIndex < 100){
      image(grass, (e.realX - player.x), (e.realY - player.y), 200, 100);
    }
    // rect(e.realX - player.x, e.realY - player.y, e.width, e.height);
  });
}
