class Paddle{
    constructor(z){
        this.z = z;
        this.x = 0;
        this.y = 0;

        this.w = 120;
        this.h = 80;
        
        this.points = 0;
    }

    moveTo(x,y){
        x = constrain(x, gamefield.left+this.w/2, gamefield.right-this.w/2);
        y = constrain(y, gamefield.top+this.h/2, gamefield.bot-this.h/2);
        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }

    contains(x, y) {
        let left = this.x-this.w/2, 
            top = this.y-this.h/2;
        return left <= x && x <= left + this.w &&
               top <= y && y <= top + this.h;
    }

    draw(){
        stroke(244,250,180);
        (this.z < 400) ? strokeWeight(2): strokeWeight(1);
        fill('rgba(150,255,255, 0.25)');
        let top = this.y-this.h/2;
        let left = this.x-this.w/2;
        rect(left*scl(this.z), top*scl(this.z), this.w*scl(this.z), this.h*scl(this.z),
        20*scl(this.z), 20*scl(this.z), 20*scl(this.z), 20*scl(this.z));

        if(this.z < 400){
            //Inner rect
            noFill();
            let innerScale = 3;
            let innerTop = this.y-this.h/innerScale/2;
            let innerLeft = this.x-this.w/innerScale/2;
            rect(innerLeft*scl(this.z), innerTop*scl(this.z), this.w/innerScale*scl(this.z), this.h/innerScale*scl(this.z),
            5*scl(this.z), 5*scl(this.z), 5*scl(this.z), 5*scl(this.z));

            //Lines
            line(innerLeft,this.y,left,this.y);
            line(innerLeft+this.w/innerScale,this.y,left+this.w,this.y);
            line(this.x,innerTop, this.x, top);
            line(this.x,innerTop+this.h/innerScale, this.x, top+this.h);
        }
    }
}