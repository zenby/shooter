import { intervals } from '../constants';
import { sendResultToDatabase } from './requestUtils';

export function updateLevelLabel(lvl) {
  const levelLabel = document.querySelector('.level');
  levelLabel.innerHTML = lvl;
}

export function showReplayButton() {
  const replayButton = document.querySelector('.replay-container');
  replayButton.style.display = "block";
}

export function updateScoreLabel(currentTime, startTime) {
  currentTime += intervals.updateGameState;
  const value = (currentTime - startTime) / 10;
  const scoreLabel = document.querySelector(".score");
  scoreLabel.innerHTML = value;
  return currentTime + intervals.updateGameState;
}

export function showLoseMessage() {
  const scoreLabel = document.querySelector(".score");
  const score = scoreLabel.innerText;
  const name = prompt("Sorry, but you lose, your score is " + score, 'User');
  sendResultToDatabase(+score, name || 'User');
}

export function subscribeToShowReplay(cb) {
  const replayButton = document.querySelector('.replay-container');
  replayButton.addEventListener('click', cb, { once: true });
}

export function hideReplayButton() {
  const replayButton = document.querySelector('.replay-container');
  replayButton.style.display = "none";
}