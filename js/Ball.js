class Ball{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 400;
        this.ax = 0;
        this.ay = 0;
        this.r = 30;
        this.z = this.r;
        this.maxVZ = 1500;
    }

    update(dt){

        if(gamefield.gameOver){
            return;
        }


        // Z-direction
        if(this.z + this.r/2 > depth || this.z - this.r/2 < 0){

                if(this.vz < 1){
                    
                    if(!player.contains(this.x, this.y)){
                        //PLAYRT MISSED
                        console.log('Player missed');
                        gamefield.gameOver = true;
                        gamefield.reset();

                    } else {
                        console.log('Player hit');
                        let dx = Math.abs(this.x - player.x);
                        let dy = Math.abs(this.y - player.y);
                        dx = map(dx, player.w/2, 0, 0, 1);
                        dy = map(dy, player.h/2, 0, 0, 1);
                        let az =  map(dx, 0, 1, 0.8, 1.4);
                        this.ax = dx*100*Math.sign(this.x - player.x);
                        this.ay = dy*100*Math.sign(this.x - player.x);
                        this.vz *= az;
                        this.vz = constrain(this.vz, -this.maxVZ, this.maxVZ);
                        if (Math.abs(this.vz) < 400){
                            this.vz = Math.sign(this.vz)*400;
                        }
                    }
                } else {
                    
                    if(!bot.contains(this.x, this.y)){
                        //BOT MISSED
                        console.log('Bot missed')
                        gamefield.gameOver = true;
                        gamefield.reset();
                                                

                    }
                }
            this.vz *= -1;
            this.vz = constrain(this.vz, -this.maxVZ, this.maxVZ);
        }

        //X-direction
        if(this.x - this.r/2 < gamefield.left || this.x + this.r/2 > gamefield.right){
            this.vx *= -1;
        }

        //Y-direction
        if(this.y - this.r/2 < gamefield.top || this.y + this.r/2 > gamefield.bot){
            this.vy *= -1;
        } 

        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.z += this.vz * dt;
    }

    draw(){
        noStroke();
        fill(200,100,255);
        ellipse(this.x*scl(this.z),this.y*scl(this.z),this.r*scl(this.z));

        noFill();
        stroke(200,100,255);
        strokeWeight(1);
        let x = gamefield.left*scl(this.z);
        let y = gamefield.top*scl(this.z);
        let w = (gamefield.right-gamefield.left)*scl(this.z);
        let h = (gamefield.bot - gamefield.top)*scl(this.z);
        rect(x, y, w, h);
    }
}