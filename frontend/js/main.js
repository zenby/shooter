import { Game } from "./game-arena";

let game;
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const canvas = document.querySelector("canvas");

const URL = 'https://shooter-game-2a1be.firebaseio.com/statistics/.json';
let bestScores = [];

initializeGame();

export function initializeGame() {
  getScoreFromDatabase();
  game = new Game(canvas);
  scoreLabel.innerHTML = 0;
  speedLabel.innerHTML = 0;
  document.addEventListener('keydown', startGame, { once: true });
}

function startGame() {
  game.start();
}

export function sendResultToDatabase(score, name) {
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ score, name })
  })
}

export function getScoreFromDatabase() {
  fetch(URL, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      bestScores = data;
      console.log(bestScores)
    })
    .catch(error => console.log('misterious error'))
}

export function getTop10() {

}