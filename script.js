var scores, activePlayer, roundScore, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {    //1. as soon as the button is clicked we need a random number.............................................
        var dice = Math.floor(Math.random() * 6) + 1;


        //2. Display the result...................................................................................
        diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score If the rolled number  was not a 1.............................................
        if (dice !== 1) {
            //Add score...........................................................................................
            roundScore += dice; // wil add the value of diec into roundscore  "roundScore= roundScore + dice"
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player.........................................................................................
            nextPlayer();
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //1. Add current score to global score....................................................................
        scores[activePlayer] += roundScore  // this will add activePlayer's roundScore to its global score........

        //2. Update the UI with the global score..................................................................
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //3. Check if player won the game.........................................................................
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');  // adding class to the winner player
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); // removing active class from the winning player..
            gamePlaying = false;
        } else {
            //4. Next player when an activePlayer clicks hold button..................................................
            nextPlayer();
        }

    }

});


function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // setting round Score to 0, so it will again start from 0.

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // set active class on players.........................................................................
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide the dice when it shows 1 for activePlayer......................................................
    document.querySelector('.dice').style.display = 'none';
};

// initializing the game\....................................................................................
document.querySelector('.btn-new').addEventListener('click', init); // we are passing init function and not calling it..


function init() {
    scores = [0, 0],
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winnwe');
    document.querySelector('.player-1-panel').classList.remove('winnwe');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}