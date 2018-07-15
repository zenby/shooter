import { Game } from "./game-arena";

initializeGame();

function initializeGame() {
  const canvas = document.querySelector("canvas");

  const game = new Game(canvas);
  game.start();
}
