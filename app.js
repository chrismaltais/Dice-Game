/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

function init () {
    scores = [0, 0];
    roundScore = 0;
    gamePlaying = 1;
    activePlayer = Math.floor(Math.random()* 2);
    document.getElementById('score-1').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('name-1').textContent = 'Chris';
    document.getElementById('name-0').textContent = 'JP';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

init();

// Switch Player Function
function switchPlayer() {
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

// Set CURRENT scores to 0
function setToZero() {
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}

// Set Current and Total score to 0
function setAllToZero() {
    roundScore = 0;
    scores[activePlayer] = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    document.getElementById('score-' + activePlayer).textContent = 0;
}

function getFinalScore() {
    
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    
    if (gamePlaying){
        // 1. Generate Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
    
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        // 3. Update the round score if roll was NOT 1
        if (dice === 6 && lastDice === 6) {
            // Player loses score
            setAllToZero();
            switchPlayer();
        }  if (dice > 1) {
                // Add value
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }  else {
                // Set to 0
                setToZero();
                // Change player
                switchPlayer();
            }
        
        lastDice = dice;
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        // Set score to current score
        scores[activePlayer] += roundScore;
        
        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        // Undefined, 0, null, "" is COERCED to false
        // Anything else COERCED to true
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // Check for Winner
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = 0;
        
            // Set current score to 0
            setToZero();
        } else {
            // Set current score to 0
            setToZero();
       
            // Switch players
            switchPlayer();
        }
    } 
});

document.querySelector('.btn-new').addEventListener('click', init);
    

// Setter
//document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = <em> dice </em>;

// Getter
//var x = document.querySelector('#score-' + scores[i]).textContent;

