// game over
function gameOver() {
    audioLoose.play();
    theBody.onclick = null;
    theLeftSide.lastChild.onclick = null;
    clearInterval(startTimer);
}

// generate modal window
function triggerModal(message, playAgain) {
    var modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    var modalBody = document.createElement('div');
    modalBody.id = 'modal-body';
    var playAgainButton = playAgain ? '<button onclick="location.reload()" class="modal-button">Play Again</button>' : '';
    modalBody.innerHTML = message + playAgainButton;
    modalContainer.appendChild(modalBody);
    document.body.appendChild(modalContainer);
}

// notify player depending on points scored and level reached
function notifyPlayer(currentLevel, currentPoints) {
    var message = '<h1>Game Over</h1>';
    var localStoragePoints = localStorage.getItem('pointsRecord') === null ? 0 : localStorage.getItem('pointsRecord');
    var localStorageLevels = localStorage.getItem('levelsRecord') === null ? 0 : localStorage.getItem('levelsRecord');
    console.log(localStoragePoints);
    console.log(currentPoints);

    if (currentPoints > localStoragePoints) {
        var pointsDiff = currentPoints - localStoragePoints;
        message += '<h2>Wow ' + currentPoints + ' points, new record!</h2><h3>You scored ' + pointsDiff + ' more than the previous record.</h3>'
        if (currentLevel > localStorageLevels) {
            message += '<h3>You also set a new record by reaching level ' + currentLevel + '.</h3>'
            localStorage.setItem('pointsRecord', currentPoints);
            localStorage.setItem('levelsRecord', currentLevel);
        }
    } else {
        pointsDiff =  localStoragePoints - currentPoints;
        message += '<h3>Points: ' + currentPoints + '</h3><h3>Level: ' + currentLevel + '</h3><h3><h3>You scored ' + pointsDiff + ' less than your previous record.</h3>';
    }
    triggerModal(message, true);
}
