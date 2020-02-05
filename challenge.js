// This file add addition rules to the game, it is replacement of app.js

var scores, roundScore, activePlayer, gamePlaying, prevDice;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random number and display
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var dice = dice1 + dice2;
    var dice1DOM = document.querySelector("#dice-1");
    var dice2DOM = document.querySelector("#dice-2");
    dice1DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.style.display = "block";
    dice2DOM.src = "dice-" + dice2 + ".png";

    if (
      (dice1 == 6 && dice2 == 6) ||
      ((dice1 == 6 || dice2 == 6) && prevDice == 6)
    ) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;
      changePlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      if (dice1 == 6 || dice2 == 6) {
        prevDice = 6;
      }
    } else {
      changePlayer();
    }
  }
});

var changePlayer = function() {
  prevDice = 0;
  roundScore = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //document.querySelector(".dice").style.display = "none";
  activePlayer = 1 - activePlayer;
};

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var pointsToWin = 100;
    var input = document.querySelector(".final-score").value;

    if (input) {
      pointsToWin = input;
    }

    // Check winner
    if (scores[activePlayer] >= pointsToWin) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  prevDice = 0;
  gamePlaying = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
