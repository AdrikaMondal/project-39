class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1=createSprite(180,200);
    car1.addImage(car1Img);
    car1.scale = 0.4;

    car2=createSprite(380,200);
    car2.addImage(car2Img);
    car2.scale = 0.4;

    car3=createSprite(580,200);
    car3.addImage(car3Img);
    car3.scale = 0.4;

    car4=createSprite(780,200);
    car4.addImage(car4Img);
    car4.scale = 0.4;

    car=[car1,car2,car3,car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(groundImg);
      image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index=0, x=200, y;
     
      for(var plr in allPlayers){
        x = x+250, y = displayHeight - allPlayers[plr].distance
        index = index + 1
        car[index - 1].x = x
        car[index - 1].y = y
        if (index === player.index){
car[index - 1].shapeColor = "red"
camera.position.y = car[index-1].y
camera.position.x = displayWidth/2

rectMode(CENTER);
fill("white");
rect(x,y,60,90);

       
        }
    }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance > 3000){
      gameState = 2
      player.rank = player.rank + 1
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();

  }
  end(){
    console.log(player.rank);
  }
}