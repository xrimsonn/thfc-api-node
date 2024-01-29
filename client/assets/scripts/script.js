const url = 'http://localhost:3000/players';

function loadData() {
  fetch(url, {
    method: 'GET',
    headers: {
      auth: 'qwerty',
    },
  }).then((data) =>
    data.json().then((data) =>
      data.forEach((p) => {
        const article = document.getElementById('board');
        const player = document.createElement('div');

        const img = document.createElement('img');
        const hgroup = document.createElement('hgroup');
        const name = document.createElement('h2');
        const position = document.createElement('p');

        // Supongamos que p.born es la cadena de fecha en formato '2002-09-01'
        var bornDate = new Date(p.born);
        var options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        var formattedDate = bornDate.toLocaleDateString(
          'en-US',
          options
        );

        img.src = p.image;
        name.innerHTML = '#' + p.number + ' - ' + p.name;
        position.innerHTML = p.position + ' - ' + formattedDate;

        hgroup.appendChild(name);
        hgroup.appendChild(position);

        player.classList.add('grid');
        player.classList.add('item');

        player.appendChild(img);
        player.appendChild(hgroup);

        article.appendChild(player);
      })
    )
  );
}
