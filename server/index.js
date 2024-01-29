const players = require('./players.json');
const conn = require('express');
const cors = require('cors');
const app = conn();
const port = 3000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'PUT'],
  })
);

app.use(conn.json());

app.get('/players', auth, (req, res) => {
  res.json(players);
});

app.put('/players/:number', auth, (req, res) => {
  const number = parseInt(req.params.number);
  const updatedData = req.body;

  const player = players.find((p) => p.number === number);
  console.log(updatedData);

  if (player) {
    Object.assign(player, updatedData);
    
    res.json({
      message: `Player with number ${number} updated`,
      data: player,
    });

  } else {
    res.status(404).json({ message: `No player found with number ${number}` });
  }
});


players.forEach((x) => {
  app.get('/players/' + x.name, auth, (req, res) => {
    res.json(x);
  });
});

app.listen(port, () => {
  console.log('http://localhost:' + port + '/players');
});

function auth(req, res, next) {
  const auth = req.headers.auth;

  if (auth == 'qwerty') {
    next();
  } else {
    res.send('Invalid credentials.');
  }
}
