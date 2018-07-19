import { intervals } from '../constants';
import { sendResultToDatabase } from './requestUtils';

const replayButton = document.querySelector('.replay-container');
const scoreLabel = document.querySelector(".score");

export function updateLevelLabel(lvl) {
  const levelLabel = document.querySelector('.level');
  levelLabel.innerHTML = lvl;
}

export function showReplayButton() {
  replayButton.style.display = "block";
}

export function updateScoreLabel(currentTime, startTime) {
  currentTime += intervals.updateGameState;
  const value = (currentTime - startTime) / 10;
  scoreLabel.innerHTML = value;
  return currentTime + intervals.updateGameState;
}

export function showLoseMessage() {
  const score = scoreLabel.innerText;
  const name = prompt("Sorry, but you lose, your score is " + score, 'User');
  sendResultToDatabase(+score, name || 'User');
}

export function subscribeToShowReplay(cb) {
  replayButton.addEventListener('click', cb, { once: true });
}

export function hideReplayButton() {
  replayButton.style.display = "none";
}