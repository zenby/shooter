import { Game } from "./game";

import { hideReplayButton } from './utils/userUtils';
import Router from './utils/router';
import routes from './routes';

export let game;

export function initializeGame() {
  const canvas = document.querySelector("canvas");
  hideReplayButton();
  game = new Game(canvas);
  document.querySelector('.speed').innerHTML = 0;
  document.querySelector('.score').innerHTML = 0;
  document.addEventListener('keydown', startGame, { once: true });
}

export function startGame() {
  game.start();
}

new Router(routes);

