import { Game } from "./game-arena";

let game;
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const levelLabel = document.querySelector('.level');
const canvas = document.querySelector("canvas");

const URL = 'https://shooter-game-2a1be.firebaseio.com/statistics/.json';
let bestScores = [];

initializeGame();

export function updateLevel(lvl) {
  levelLabel.innerHTML = lvl;
}

export function initializeGame() {
  getScoreFromDatabase();
  game = new Game(canvas);
  scoreLabel.innerHTML = 0;
  speedLabel.innerHTML = 0;
  levelLabel.innerHTML = 1;
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
  fetch(`${URL}?orderBy=\"score\"&limitToLast=8`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      bestScores = getTop10(data);
      console.log(bestScores);
    })
    .catch(() => console.log('misterious error'))
}

export function getTop10(data) {
  const array = Object.values(data);
  return array.sort((a, b) => a.score < b.score);
}