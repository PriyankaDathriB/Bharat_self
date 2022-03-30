class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");

    this.leadeboardTitle = createElement("h2");

    this.leader1 = createElement("h2");
    this.leader2 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
 
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();888

    form = new Form();
    form.display();

    goal=createSprite(width/2,height/2-100,700,300)
    goal.addImage("goal", goalImg);

    p1 = createSprite(width / 2 - 50, height - 100);
    p1.addImage("striker", striker_img);
    p1.scale = 0.07;
    p2 = createSprite(width / 2 + 100, height/2 +50);
    p2.addImage("goli", goli_img);
    p2.scale = 0.7;
 
  }

  play() {
    this.handleElements();
    this.handleResetButton();
     
    this.handlePlayerControls()
    drawSprites();
    
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd: 0
      });
      window.location.reload();
    });
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  } 


  handlePlayerControls() {

    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true;
      p1.positionY += 10;
      p1.update();
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.leftKeyActive = true;
      p1.positionX -= 5;
      p1.update();
    }

    if (keyIsDown(RIGHT_ARROW) ) {
      this.leftKeyActive = false;
      p1.positionX += 5;
      p1.update();
    }
  
  }

  
  

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  }

