const players = [
  {
    number: 4,
    name: 'Oliver Skipp',
    position: 'CMD',
    born: '2000-09-15',
    image:
      'https://sttotv8prodmedia.blob.core.windows.net/mediacache/b/b/4/4/5/2/bb4452e2441f939c37cdc888406ad4095fdad624.png',
  },
  {
    number: 5,
    name: 'Pierre-Emile Højbjerg',
    position: 'CMD',
    born: '1995-08-04',
    image: '',
  },
  {
    number: 6,
    name: 'Radu Drăgușin',
    position: 'RCB',
    born: '2002-02-02',
    image: '',
  },
  {
    number: 7,
    name: 'Heung-Min Son',
    position: 'LW',
    born: '1992-07-07',
    image: '',
  },
  {
    number: 8,
    name: 'Yves Bissouma',
    position: 'CMD',
    born: '1996-08-29',
    image: '',
  },
  {
    number: 9,
    name: 'Richarlison',
    position: 'ST',
    born: '1997-05-09',
    image: '',
  },
  {
    number: 10,
    name: 'James Maddison',
    position: 'CAM',
    born: '1996-11-22',
    image:
      'https://sttotv8prodmedia.blob.core.windows.net/mediacache/2/b/5/b/0/c/2b5b0c2692a5baa8c25c61a17efcc138374c4e2b.png',
  },
  {
    number: 11,
    name: 'Bryan Gil',
    position: 'RW',
    born: '2001-02-10',
    image: '',
  },
  {
    number: 12,
    name: 'Emerson Royal',
    position: 'RB',
    born: '1999-01-13',
    image: '',
  },
  {
    number: 13,
    name: 'Guglielmo Vicario',
    position: 'GK',
    born: '1996-10-06',
    image: '',
  },
  {
    number: 16,
    name: 'Timo Werner',
    position: 'LW',
    born: '1996-03-05',
    image: '',
  },
  {
    number: 17,
    name: 'Cristian Romero',
    position: 'RCB',
    born: '1998-04-26',
    image: '',
  },
  {
    number: 18,
    name: 'Giovani Lo Celso',
    position: 'CAM',
    born: '1996-04-08',
    image: '',
  },
  {
    number: 19,
    name: 'Ryan Sessengnon',
    position: 'LW',
    born: '2000-05-17',
    image: '',
  },
  {
    number: 20,
    name: 'Fraser Forster',
    position: 'GK',
    born: '1988-03-16',
    image: '',
  },
  {
    number: 21,
    name: 'Dejan Kulusevski',
    position: 'RW',
    born: '2000-04-14',
    image: '',
  },
  {
    number: 22,
    name: 'Brennan Johnson',
    position: 'RW',
    born: '2001-05-22',
    image: '',
  },
  {
    number: 23,
    name: 'Pedro Porro',
    position: 'RB',
    born: '1999-09-12',
    image: '',
  },
  {
    number: 27,
    name: 'Manor Solomon',
    position: 'LW',
    born: '1999-07-23',
    image: '',
  },
  {
    number: 29,
    name: 'Pape Matar Sarr',
    position: 'CM',
    born: '2002-09-13',
    image: '',
  },
  {
    number: 30,
    name: 'Rodrigo Bentancur',
    position: 'CM',
    born: '1997-06-24',
    image: '',
  },
  {
    number: 33,
    name: 'Ben Davies',
    position: 'LCB',
    born: '1993-04-23',
    image: '',
  },
  {
    number: 36,
    name: 'Alejo Veliz',
    position: 'ST',
    born: '2003-09-18',
    image: '',
  },
  {
    number: 37,
    name: 'Mickey van de Ven',
    position: 'LCB',
    born: '2001-04-18',
    image: '',
  },
  {
    number: 38,
    name: 'Destiny Udogie',
    position: 'LB',
    born: '2002-11-27',
    image: '',
  },
  {
    number: 40,
    name: 'Brandon Austin',
    position: 'GK',
    born: '1999-01-07',
    image: '',
  },
  {
    number: 41,
    name: 'Alfie Whiteman',
    position: 'GK',
    born: '1998-10-01',
    image: '',
  },
];

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
