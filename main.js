song1 = "";
song2 = "";
scoreLeftwrist = 0;
scoreRightwrist = 0;
LeftWristY = 0;
LeftWristX = 0;
RightWristY = 0;
RightWristX = 0;
song1_playing = "";
song2_playing = "";


function preload(){
    song1 = loadSound("bos.mp3");
    song2 = loadSound("firse.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose", gotposes)
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotposes(results){
    if(results.length > 0 ){
        console.log(results);

        scoreRightwrist = results[0].pose.keypoints[10].score;

        scoreLeftwrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is "+scoreLeftwrist+"score of right wrist is"+scoreRightwrist);

        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;

        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;

        console.log("Left wrist x is"+LeftWristX+" And left wrist y is"+LeftWristY+": Right wrist x is"+
        RightWristX+"Right wrist y is"+RightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("lime");
    stroke("black")

    song1_playing = song1.isPlaying();
    song2_playing = song2.isPlaying();
    if(scoreRightwrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop()
        if(song1_playing == false){
            song1.play();
            document.getElementById("song").innerHTML = "Boss by Jass manak"
            numberRightwristy = Number(RightWristY);
            removedecimals = floor(numberRightwristy);
            volume = removedecimals/500;
            document.getElementById("volume").innerHTMl = "Volume is ="+volume;
            song1.setVolume(volume)
        }
    }
    if(scoreLeftwrist > 0.2){
        circle(LeftWristX,LeftWristY,20);
        song1.stop();
        if(song2_playing == false){
            song2.play();
            document.getElementById("song").innerHTML = "firse machainge by Jass manak"
            numberLeftwristy = Number(LeftWristY);
            removedecimals = floor(numberLeftwristy);
            volume = removedecimals/500;
            document.getElementById("volume").innerHTMl = "Volume is ="+volume;
            song2.setVolume(volume)
        }
    }
}

function play(){
    song1.play();
    song1.rate(1);
    song2.rate(1);
    song1.setVolume(0.5);
}