objects = [];
status = "";
song = "";

function preload(){
    song = loadSound("wake_up.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Baby";
}   

function modelLoaded(){
    console.log("Model is loaded!");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){

        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++){

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){

            document.getElementById("status").innerHTML = "Satus: Baby Detected";

            song.stop();

            console.log("Stoped");
            
            }
            else{
                document.getElementById("status").innerHTML = "Status: Baby Not Detected";
                song.play();
                console.log("Playing");
            }
        }
        if(objects.length == 0){
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            song.play();
            console.log("PLaying");
        }
    }
}
