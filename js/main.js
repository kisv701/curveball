/**
 * An attempt att recreateing the old flashgame curveball in javascript using a bit more modern tech.
 */
let gamefield, player, bot, ball, player_control, bot_control;
const depth = 800;
const scl = function(z){
    return pow(map(z, 0, depth, 1, 0.6),3)
}
function preload(){

}

function setup(){
    createCanvas(800, 500);
    gamefield = new GameField();
    player = new Paddle(0);
    bot = new Paddle(depth);
    ball = new Ball();
    player_control = new Mouse();
    bot_control = new Level1();
}

function draw(){
    background(51);
    
    translate(width/2, height/2);
    gamefield.draw();
    bot.draw();
    ball.update(1/60);
    bot_control.update(1/60);
    ball.draw();
    
    player.moveTo(player_control.getX(),player_control.getY());
    bot.moveTo(bot_control.getX(), bot_control.getY());
    player.draw();

    if(gamefield.gameOver){
        textSize(24);
        textFont('Verdana');
        text('Click to start game!', -100, -30);
    }
    
}

function mouseClicked() {
    if (gamefield.gameOver) {
        gamefield.reset();
        gamefield.start();
    }
  }