document.addEventListener('DOMContentLoaded', () => {
  const listaPlatos = document.getElementById('lista-platos');
  const form = document.getElementById('form-plato');

  function cargarPlatos() {
    fetch('/api/platos')
      .then(res => res.json())
      .then(data => {
        listaPlatos.innerHTML = '';
        data.forEach(plato => {
          const li = document.createElement('li');
          li.textContent = `${plato.nombre} - S/ ${plato.precio}`;
          listaPlatos.appendChild(li);
        });
      });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = form.nombre.value;
    const precio = form.precio.value;

    fetch('/api/platos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio })
    }).then(() => {
      form.reset();
      cargarPlatos();
    });
  });

  cargarPlatos();
});
