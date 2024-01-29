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
        const edit = document.createElement('button');
        const form = document.createElement('form');
        form.className = 'form';

        var bornDate = new Date(p.born);
        var options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };

        var formattedDate = bornDate.toLocaleDateString('en-US', options);

        img.src = p.image;
        name.innerHTML = '#' + p.number + ' - ' + p.name;
        position.innerHTML = p.position + ' - ' + formattedDate;
        edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
        edit.className = 'edit';
        edit.addEventListener('click', () => {
          const nameInput = document.createElement('input');
          const posInput = document.createElement('input');
          const submit = document.createElement('button');

          nameInput.type = 'text';
          nameInput.placeholder = p.name;
          nameInput.className = 'input';

          posInput.type = 'text';
          posInput.placeholder = p.position;
          posInput.className = 'input';

          submit.textContent = 'Submit';
          submit.type = 'Button';
          submit.addEventListener('click', () => {
            edit.remove();
            fetch('http://localhost:3000/players/' + p.number, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth': 'qwerty',
              },
              body: JSON.stringify({
                name: nameInput.value,
                position: posInput.value,
              }),
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Bad Request');
                console.log(response);
              }
              return response.json();
            })
            .then(data => {
              console.log('Solicitud exitosa:', data);
              location.reload();
            })
            .catch(error => {
              console.error('Error en la solicitud:', error);
            });
          });
          
          submit.className = 'input';

          form.append(nameInput);
          form.append(posInput);
          form.appendChild(submit);
          edit.remove();
        });

        hgroup.appendChild(name);
        hgroup.appendChild(position);

        player.classList.add('grid');
        player.classList.add('item');

        player.appendChild(img);
        player.appendChild(hgroup);
        player.appendChild(edit);
        player.appendChild(form);

        article.appendChild(player);
      })
    )
  );
}
