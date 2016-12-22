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
