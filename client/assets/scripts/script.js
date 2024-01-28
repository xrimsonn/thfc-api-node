const url = 'http://localhost:3000/players';

function loadData() {
  fetch(url, { method: 'GET', headers: {
    auth: 'qwerty'
  } }).then((data) =>
    data.json().then((data) => console.log(data))
  );
}
