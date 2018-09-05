/**
 * An attempt att recreateing the old flashgame curveball in javascript using a bit more modern tech.
 */
let gamefield, player, bot, ball, player_control, bot_control, player_mouse_control, player_pose_control;
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
    player_pose_control = new CameraPoseNet(); 
    player_mouse_control = new Mouse();
    player_control = player_mouse_control;
    bot_control = new Level1();

    radio = createRadio();
    radio.option('Pose control');
    radio.option('Mouse control');
}

function draw(){

    //Select correct control method
    if(radio.value() == 'Pose control'){
        player_control = player_pose_control;
    } else if(radio.value() == 'Mouse control') {
        player_control = player_mouse_control;
    };
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


    textSize(24);
    textFont('Verdana');
    text('Player: ' + player.points, -250, -210);
    text('Bot: ' + bot.points, 250, -210)
    if(gamefield.gameOver){
        text(player_control.startMessage, -100, -30);
    }
    
}

function mouseClicked() {
    if (gamefield.gameOver && player_control instanceof Mouse) {
        gamefield.start();
    }
  }