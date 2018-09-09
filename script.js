var scores, activePlayer, roundScore, gamePlaying, lastDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {    //1. as soon as the button is clicked we need a random number.............................................
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result...................................................................................
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

         //3. Update the round score If the rolled number  was not a 1.............................................
         if (dice1 !== 1 && dice2 !== 1){
            //Add score...........................................................................................
            roundScore += dice1 + dice2; // wil add the value of diec into roundscore  "roundScore= roundScore + dice"
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player.........................................................................................
            nextPlayer();
        }
        // lastDice = dice;
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //1. Add current score to global score....................................................................
        scores[activePlayer] += roundScore  // this will add activePlayer's roundScore to its global score........

        //2. Update the UI with the global score..................................................................
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore ;

        // undefined, null, 0 or "" then it is COERCEd to False, anything else if true........
        if (input) {
            winningScore = input;
        }else {
            winningScore = 20;
        }

        //3. Check if player won the game.........................................................................
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
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
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
};

// initializing the game\....................................................................................
document.querySelector('.btn-new').addEventListener('click', init); // we are passing init function and not calling it..


function init() {
    scores = [0, 0],
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}