var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
  });
var bricks;
var newBrick;
var brickInfo;
var ball;
var paddle;
var text;
var score = 0;
var counter = 0;
var scoreText;
var hit;
var endGame;
var brickBroke;
  function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('ball', './ball.png');
    game.load.image('paddle', './paddle.png');
    game.load.image('brick', './brick.png');
    game.load.audio('hit','./21692__ice9ine__left-foot.wav');
    game.load.audio('endGame','./544088__josefpres__dark-loops-067-simple-mix-version-4-short-loop-60-bpm.wav');
    game.load.audio('brickBroke','./544390__department64__hits-concrete-01.wav')
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    ball = game.add.sprite(game.world.width*0.5,game.world.height-25,'ball');
    ball.scale.set(0.2);
    ball.anchor.set(0.5);
    paddle = game.add.sprite(game.world.width*0.5,game.world.height-5,'paddle');
    paddle.scale.set(1.5);
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle,Phaser.Physics.ARCADE);
    game.physics.enable(ball ,Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.body.velocity.set(400,-400)
    paddle.body.immovable = true;
    game.physics.arcade.checkCollision.down = false;
    ball.checkWorldBounds = true;
    hit = game.add.audio('hit');
    brickBroke = game.add.audio('brickBroke')
    endGame = game.add.audio('endGame');
    ball.body.gravity.y = game.rnd.integerInRange(0, 200);
    ball.events.onOutOfBounds.add(()=>{
        alert('Game over');
        endGame.play();
        location.reload();
    }, this);
    scoreText = game.add.text(5, 5, 'Points: 0', { font: '44px Arial', fill: '#0095DD' });
    initBrick();


  }
  function update() {
      ball.angle += 2;
      game.physics.arcade.collide(ball, paddle, ()=>{hit.play();ball.body.gravity.y = game.rnd.integerInRange(0, 200);});
      game.physics.arcade.collide(ball, bricks, ballHitBrick); //третий параметр это функция которая будет вызываться когда произойдет столконовение 
      paddle.x = game.input.x || game.world.width*0.5;  
  }



  function initBrick(){
    brickInfo = {
        width: 200,
        height: 100,
        count: {
            row: 4,
            col: 8
        },
        offset: {
            top: 100,
            left: 300
        },
        padding: 10
    };

    bricks = game.add.group();
    for(c=0; c<brickInfo.count.col; c++) {
        for(r=0; r<brickInfo.count.row; r++) {
            var brickX = (c*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
            var brickY = (r*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
            newBrick = game.add.sprite(brickX, brickY, 'brick');
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            newBrick.scale.set(2);
            bricks.add(newBrick);
            counter += 1;
        }
    }
}

    function ballHitBrick(ball, brick) {
    brickBroke.play();
    brick.kill();
    score += 10;
    scoreText.setText('Points: ' + score);
    counter -= 1;
    if(counter == 0){
        endGame.play();
        setTimeout(()=>{ alert('you win')
        location.reload();},0)
       
    }
}