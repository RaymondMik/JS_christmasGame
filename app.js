// setup
var options = {
    totalTime: 60,
    numberOfFaces: 2,
    increaseFaces: 2,
    guessPoints: 100,
    losePoints: 100,
    levelPoints: 500
}

// starting values
var currentLevel = 1; 
var currentPoints = 0;
var count = 0;
var levelCount = 0;
var previousTime = Date.now();

// DOM traversing
var documentBody = document.getElementsByTagName("body");
var theLeftSide = document.getElementById("leftSide");
var theRightSide = document.getElementById("rightSide");
var theBody = document.getElementById("game-area");
var lives = document.getElementById("lives");
var level = document.getElementById("level");
var points = document.getElementById("points");
var time = document.getElementById("time");
var playAgain = document.getElementById("modal-container-gameOver");
var modalMessage = document.getElementById("modal-message");
var audioButton = document.getElementById("audio-button");
var audioIcon = document.getElementById("audio-icon");
audioIcon.style.backgroundImage = 'url("assets/music_yes.png")';
var display = document.querySelector('#time');
level.innerHTML = currentLevel;
points.innerHTML = currentPoints;
time.innerHTML = options.totalTime;

// resources
var audioWin = new Audio("assets/dog_barking.mp3");
var audioLoose = new Audio("assets/dog_crying.mp3");
var audioSigletta = new Audio("assets/jingle_bells.mp3");
var puppyWidth = screen.width < 400 ? 50 : 100;
var puppyHeight = screen.width < 400 ? 50 : 100;
var puppyTopPos = screen.width < 400 ? 200 : 500;
var puppyLeftPos = screen.width < 400 ? 125 : 500;
audioSigletta.loop = true;

generateFaces();
var startTimer = setInterval(timer, 1000);
this.audioSigletta.play();

function timer() {
    time.innerHTML = options.totalTime;
    if (options.totalTime >= 0) {
       options.totalTime -= 1; 
    } 
    if (options.totalTime === -1) {
        gameOver();
        notifyPlayer(currentLevel, currentPoints);
    }
}

// generate faces
function generateFaces() {
    var self = this;
    for ( var i = 0; i < options.numberOfFaces; i++) {

        //generate, place and style puppy face
        var puppyFace = document.createElement('img');
        puppyFace.className = 'item';
        var randomPositionTop = Math.floor(Math.random() * puppyTopPos);
        var randomPositionLeft = Math.floor(Math.random() * puppyLeftPos);
        puppyFace.style.top = randomPositionTop + 'px';
        puppyFace.style.left = randomPositionLeft + 'px';
        puppyFace.style.width = puppyWidth + 'px';
        puppyFace.style.height = puppyHeight + 'px';
        puppyFace.src = 'assets/tommy.png';
    
        //add images to the left side
        theLeftSide.appendChild(puppyFace);
        
        //clone leftSide node
        var leftSideImages = theLeftSide.cloneNode(true);
        leftSideImages.id = "new-puppy-face";
        
        //delete last child of LeftSideImages
        leftSideImages.removeChild(leftSideImages.lastChild);
        
        //add leftSideImages to the rightSide div
        theRightSide.appendChild(leftSideImages);
    }

    // add onclick event to last child of left side
    theLeftSide.lastChild.onclick = function nextLevel(event) {
        event.stopPropagation();
        audioWin.play();
        
        //remove images
        while (theLeftSide.firstChild && theRightSide.firstChild) {
            theLeftSide.removeChild(theLeftSide.firstChild);
            theRightSide.removeChild(theRightSide.firstChild);
        }
        self.options.numberOfFaces += self.options.increaseFaces;
        levelCount++;
        currentPoints += self.options.guessPoints;
        points.innerHTML = currentPoints;
        
        //generate a new set of Faces
        generateFaces();
        
        //if three guesses go to next level
        if (levelCount % 3 == 0) {
            currentLevel += 1;
            currentPoints += self.options.levelPoints;
            points.innerHTML = currentPoints;
            level.innerHTML = currentLevel;
        }
    }

}

// when the player clicks on anything except the correct face
theBody.onclick = function() {
    count++;
    if (count < 3) {
        var puppyLife = lives.getElementsByTagName('img');
        lives.removeChild(puppyLife[0]);
        audioLoose.play();
        if (currentPoints > 100) {
            currentPoints -= options.losePoints;
            points.innerHTML = currentPoints;
        }
    }
    if (count === 3) {
        gameOver();
        notifyPlayer(currentLevel, currentPoints);
    }
}

audioButton.onclick = function() {
    if (audioSigletta.paused) {
        audioSigletta.play();
        audioIcon.style.backgroundImage = 'url("assets/music_yes.png")';
    } else {
        audioSigletta.pause();
        audioIcon.style.backgroundImage = 'url("assets/music_no.png")';
    }
}




