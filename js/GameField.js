
class GameField {
    constructor(){
        this.left = -300;
        this.right = 300;
        this.top = -150;
        this.bot = 150;
        this.gameOver = true;
    }

    reset(){
        ball.z = ball.r;
        ball.x = 0;
        ball.y = 0;
        ball.vx = 0;
        ball.vy = 0;
        ball.vz = 0;
        ball.ax = 0;
        ball.ay = 0;
    }

    start(){
        this.gameOver = false;
        ball.vz = 400;
    }

    draw(){
        
        stroke(120);
        strokeWeight(2);
        for(let zoff = 0; zoff <= depth; zoff+= 100){
            strokeWeight(map(zoff, depth, 0, 1, 4));
            noFill();
            let x = this.left*scl(zoff);
            let y = this.top*scl(zoff);
            let w = (this.right-this.left)*scl(zoff);
            let h = (this.bot - this.top)*scl(zoff);
            rect(x, y, w, h);
        }

        strokeWeight(2);
        line(this.left, this.top, this.left*scl(depth), this.top*scl(depth));
        line(this.right, this.top, this.right*scl(depth), this.top*scl(depth));
        line(this.right, this.bot, this.right*scl(depth), this.bot*scl(depth));
        line(this.left, this.bot, this.left*scl(depth), this.bot*scl(depth));

        //Additional lines to help with the illusion of depth

        //Sides
        line(this.left, 0.33*this.top, this.left*scl(depth), 0.33*this.top*scl(depth));
        line(this.right, 0.33*this.top, this.right*scl(depth), 0.33*this.top*scl(depth));
        line(this.right, 0.33*this.bot, this.right*scl(depth), 0.33*this.bot*scl(depth));
        line(this.left, 0.33*this.bot, this.left*scl(depth), 0.33*this.bot*scl(depth));

        //Roof/floor
        line(0.5*this.left, this.top, 0.5*this.left*scl(depth), this.top*scl(depth));
        line(0.5*this.right, this.top, 0.5*this.right*scl(depth), this.top*scl(depth));
        line(0.5*this.right, this.bot, 0.5*this.right*scl(depth), this.bot*scl(depth));
        line(0.5*this.left, this.bot, 0.5*this.left*scl(depth), this.bot*scl(depth));

        //Middles
        line(0, this.top, 0, this.top*scl(depth));
        line(0, this.bot, 0, this.bot*scl(depth));

    }
}