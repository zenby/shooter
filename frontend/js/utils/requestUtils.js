const URL = 'https://shooter-game-2a1be.firebaseio.com/statistics/.json';

export function sendResultToDatabase(score, name) {
  fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ score, name })
  })
}

export function getScoreFromDatabase() {
  return fetch(`${URL}?orderBy=\"score\"&limitToLast=8`, { method: 'GET' })
    .then(response => response.json())
    .then(data => getTop8(data))
    .catch(() => console.log('server error'))
}

export function getTop8(data) {
  const array = Object.values(data);
  return array.sort((a, b) => a.score < b.score);
}
