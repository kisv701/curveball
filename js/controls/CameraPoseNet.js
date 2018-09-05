class CameraPoseNet{
    constructor(){
        this.startMessage = "Raise your left hand above your head \n to start the game!"

        //Initialize video
        this.capLoaded = false;
        this.cap = createCapture(VIDEO, () => this.capLoaded = true);
        this.cap.size(gamefield.right - gamefield.left, gamefield.bot - gamefield.top);
        this.cap.hide();

        // Create a new poseNet method
        this.net = ml5.poseNet(this.cap, () => {
            this.netLoaded = true;
            console.log('Model loaded');
        });

        //Setup control machanics
        this.x = 0;
        this.y = 0;

        this.leftWrist = 300;
        // Listen to new 'pose' events
        this.net.on('pose', (results) => {
            this.poses = results;
            if(this.poses.length > 0){
                let pose = this.poses[0].pose;
                let nose = pose.keypoints[0],
                leftEye = pose.keypoints[1],
                righteye = pose.keypoints[2];

                this.leftWrist = pose.keypoints[9].position.y;

                let faceX = (nose.position.x + leftEye.position.x + righteye.position.x) / 3;
                let faceY = (nose.position.y + leftEye.position.y + righteye.position.y) / 3;
                
                let newX = map(faceX, 0, this.cap.width, gamefield.right, gamefield.left);
                let newY = map(faceY, 0, this.cap.height, gamefield.top, gamefield.bot);

                let alpha = 0.45;
                this.x = alpha*newX + (1.0 - alpha) * this.x;
                this.y = alpha*newY + (1.0 - alpha) * this.y;

                if(this.leftWrist < faceY && gamefield.gameOver){
                    gamefield.start();
                }
            }
            
        });
    }



    getX(){
        //If net not loaded use the mouse as fallback
        if(!this.netLoaded){
            return mouseX-width/2;
        }
        return this.x;


    }

    getY(){
        //If net not loaded use the mouse as fallback
        if(!this.netLoaded){
            return mouseY-height/2;
        }
        return this.y;
    }
}
