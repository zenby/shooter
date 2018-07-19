const URL = 'https://shooter-game-2a1be.firebaseio.com/statistics/.json';
let bestScores = [];

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
