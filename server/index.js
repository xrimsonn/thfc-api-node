const players = require('./players.json');
const conn = require('express');
const cors = require('cors');
const app = conn();
const port = 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  })
);

app.get('/players', auth, (req, res) => {
  res.json(players);
});

players.forEach( x => {
  app.get('/players/' + x.name, auth, (req, res) => {
    res.json(x);
  });
});

app.listen(port, () => {
  console.log('http://localhost:' + port + '/players');
});

function auth(req, res, next) {
  const token = req.headers.auth;

  if (token == 'qwerty') {
    next();
  } else {
    res.send('Invalid credentials.');
  }

}
