class Level1{
    constructor(){
        this.pos = createVector(0,0);
        this.vel = createVector(0,0);
        this.MAX_SPEED = 3.1;
        this.MAX_ACCELERATION = 0.6;
        
    }

    update(dt){
        //This bot always go towards the ball position.
        let target = createVector(ball.x,ball.y);
        let desired = target.sub(this.pos);
        let dist = desired.mag();
        desired.normalize();
        
        if (dist < 100) {
            let m = map(dist,0,100,0,this.MAX_SPEED);
            desired.mult(m);
        } else {
            desired.mult(this.MAX_SPEED);
        }
             
        desired.mult(Math.min(this.MAX_SPEED, desired.mag()));
        
        let acc = desired.sub(this.vel);
        
        acc.limit(this.MAX_ACCELERATION);
        
        // velocity changes by acceleration
        this.vel.add(acc);
        // position changes by velocity
        this.pos.add(this.vel);
        
        acc.mult(0);
        
    }
    getX(){
        return this.pos.x;
    }

    getY(){
        return this.pos.y;

    }
}