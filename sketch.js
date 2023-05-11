var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nuvem;
var nuvemimg;






function preload(){
  trex_running = loadAnimation("assets/trex1.png","assets/trex2.png","assets/trex3.png");
  trex_collided = loadImage("assets/trex_collided.png");
  groundImage = loadImage("assets/ground2.png");
  nuvemimg = loadImage("assets/cloud.png");
 
  
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
 
  var aleatorio = Math.round(random(1, 100));
  console.log(aleatorio);
}

function draw() {
  //definir cor do plano de fundo
  background("white");
  
  
  
  // pulando o trex ao pressionar a tecla de espaço
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //impedir que o trex caia
  trex.collide(invisibleGround);

  gerarNuvens();
  drawSprites();
  
}



function gerarNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.velocityX = -3;
    nuvem.y = Math.round(random(10, 60));
   nuvem.addImage(nuvemimg);
}  
}