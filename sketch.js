var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem;
var nuvemimg;
var obs1, obs2, obs3, obs4, obs5, obs6;
var cactosG, nuvensG;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
  trex_running = loadAnimation("assets/trex1.png","assets/trex2.png","assets/trex3.png");
  trex_collided = loadImage("assets/trex_collided.png");
  groundImage = loadImage("assets/ground2.png");
  nuvemimg = loadImage("assets/cloud.png");
 
  obs1 = loadImage("assets/obstacle1.png");
  obs2 = loadImage("assets/obstacle2.png");
  obs3 = loadImage("assets/obstacle3.png");
  obs4 = loadImage("assets/obstacle4.png");
  obs5 = loadImage("assets/obstacle5.png");
  obs6 = loadImage("assets/obstacle6.png");
}

function setup() {

  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  //criar grupos (cactos e nuvens)
  cactosG = new Group();
  nuvensG = new Group();
 
  console.log("Olá " + "Samantha");
 
}

function draw() {
  //definir cor do plano de fundo
  background("white");
  
  if(gameState === PLAY){

      // pulando o trex ao pressionar a tecla de espaço
      if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -10;
      }

      //Movendo o chão
      if (ground.x < 0){
        ground.x = ground.width/2;
      }

      gerarNuvens();
      gerarCactos();

     if(trex.collide(cactosG)){
      gameState = END;
  }

  }else if(gameState === END){
    ground.velocityX = 0;
    cactosG.setVelocityXEach(0);
    nuvensG.setVelocityXEach(0);


  }

  //Adicionando um efeito de gravidade
  trex.velocityY = trex.velocityY + 0.8;
  //impedir que o trex caia
  trex.collide(invisibleGround);
  drawSprites();
}



function gerarNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(nuvemimg);

    nuvem.velocityX = -3;
    nuvem.y = Math.round(random(10, 60));
    
    nuvem.depth = 0;

    nuvem.lifetime = 210;
    nuvensG.add(nuvem);

}
}
function gerarCactos() {
  if(frameCount % 60 === 0){
    var obstacle = createSprite(400, 165, 10,40);
    obstacle.velocityX = -6;
    obstacle.scale = 0.5;
  var aleatoria;
  aleatoria = Math.round(random(1, 6));
  switch(aleatoria){
    case 1: obstacle.addImage(obs1);
    break;
    case 2: obstacle.addImage(obs2);
    break;
    case 3: obstacle.addImage(obs3);
    break;
    case 4: obstacle.addImage(obs4);
    break;
    case 5: obstacle.addImage(obs5);
    break;
    case 6: obstacle.addImage(obs6);
    break;
  } 
  obstacle.lifetime = 300;
  cactosG.add(obstacle);
}
}
