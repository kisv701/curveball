class Mouse{
    constructor(){
        this.startMessage = "Click to start the game!"
    }

    getX(){
        return mouseX-width/2;
    }

    getY(){
        return mouseY-height/2;
    }
}