// check screen size and orientation
var screenOrientation = window.matchMedia("(orientation: portrait)");

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
time.innerHTML = this.options.totalTime;

// resources
var audioWin = new Audio("assets/dog_barking.mp3");
var audioLoose = new Audio("assets/dog_crying.mp3");
var audioSigletta = new Audio("assets/jingle_bells.mp3");
audioSigletta.loop = true;

if ( screen.width < 767 ) {
    var message = '<h2>This game is available for tablets and computers only</h2>';
    this.triggerModal(message, false);
} else {

    generateFaces();
    var startTimer = setInterval(timer, 1000);
    this.audioSigletta.play();

    function timer() {
        time.innerHTML = this.options.totalTime;
        if (this.options.totalTime >= 0) {
           this.options.totalTime -= 1; 
        } 
        if (this.options.totalTime === -1) {
            this.gameOver();
            var message = '<h1>Game Over</h1><h3>Congratulations!<br>Level: ' + currentLevel + '<br> Points: ' + currentPoints + '</h3>';
            self.triggerModal(message, true);
        }
    }

    // generate faces
    function generateFaces() {
        var self = this;
       
        for ( var i = 0; i < this.options.numberOfFaces; i++) {
            //generate, place and style puppy face
            var puppyFace = document.createElement('img');
            puppyFace.className = 'item';
            var randomPositionTop = Math.floor(Math.random() * 501);
            var randomPositionLeft = Math.floor(Math.random() * 501);
            puppyFace.style.top = randomPositionTop + 'px';
            puppyFace.style.left = randomPositionLeft + 'px';
            puppyFace.style.width = 100 + 'px';
            puppyFace.style.height = 100 + 'px';
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
            var puppy = lives.getElementsByTagName('img');
            lives.removeChild(puppy[0]);
            audioLoose.play();
            if (currentPoints > 100) {
                currentPoints -= this.options.losePoints;
            }
        }
        if (count === 3) {
            self.gameOver();
            var message = '<h1>Game Over</h1><h3>Congratulations!<br>Level: ' + currentLevel + '<br> Points: ' + currentPoints + '</h3>';
            self.triggerModal(message, true);
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

}

