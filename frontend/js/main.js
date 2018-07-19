import { Game } from "./game-arena";
import { getScoreFromDatabase, sendResultToDatabase } from './utils/requests';

let game;
const canvas = document.querySelector("canvas");
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const levelLabel = document.querySelector('.level');
const replayButton = document.querySelector('.replay-container');

initializeGame();

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

export function updateLevelLabel(lvl) {
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

export function updateScoreLabel(currentTime, startTime) {
  currentTime += 10;
  const value = (currentTime - startTime) / 10;
  scoreLabel.innerHTML = value;
  return currentTime + 10;
}


export function showLoseMessage() {
  const score = scoreLabel.innerText;
  const name = prompt("Sorry, but you lose, your score is " + score, 'User');
  sendResultToDatabase(+score, name || 'User');
}