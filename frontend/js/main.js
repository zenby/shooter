import { Game } from "./game-arena";

let game;
const canvas = document.querySelector("canvas");
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const levelLabel = document.querySelector('.level');
const replayButton = document.querySelector('.replay-container');

const URL = 'https://shooter-game-2a1be.firebaseio.com/statistics/.json';
let bestScores = [];

initializeGame();

export function updateLevel(lvl) {
  levelLabel.innerHTML = lvl;
}

export function subscribeToShowReplay(cb) {
  replayButton.addEventListener('click', cb, { once: true });
}

export function hideReplayButton() {
  replayButton.style.display = "none";
}

export function showReplayButton() {
  replayButton.style.display = "block";
}

export function initializeGame() {
  getScoreFromDatabase();
  hideReplayButton();
  game = new Game(canvas);
  scoreLabel.innerHTML = 0;
  speedLabel.innerHTML = 0;
  levelLabel.innerHTML = 1;
  document.addEventListener('keydown', startGame, { once: true });

}

function startGame() {
  game.start();
}

export function updateScore(currentTime, startTime) {
  currentTime += 10;
  console.log(currentTime)
  const value = (currentTime - startTime) / 10;
  scoreLabel.innerHTML = value;
  return currentTime + 10;
}

function sendResultToDatabase(score, name) {
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ score, name })
  })
}

function getScoreFromDatabase() {
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


export function showLoseMessage() {
  const score = scoreLabel.innerText;
  const name = prompt("Sorry, but you lose, your score is " + score, 'User');
  sendResultToDatabase(+score, name || 'User');
}