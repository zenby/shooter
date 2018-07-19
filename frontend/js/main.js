import { Game } from "./game";
import { getScoreFromDatabase } from './utils/requestUtils';
import { hideReplayButton } from './utils/userUtils';

let game;
const canvas = document.querySelector("canvas");
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const levelLabel = document.querySelector('.level');

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


