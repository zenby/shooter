import { Game } from "./game-arena";

let game;
const scoreLabel = document.querySelector(".score");
const speedLabel = document.querySelector('.speed');
const canvas = document.querySelector("canvas");

initializeGame();

export function initializeGame() {
  game = new Game(canvas);
  scoreLabel.innerHTML = 0;
  speedLabel.innerHTML = 0;
  document.addEventListener('keydown', startGame, { once: true });
}


function startGame() {
  game.start();
}