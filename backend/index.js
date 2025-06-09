const express = require( 'express' );
const path = require( 'path' );
const app = express();
const PORT = 3000;

// Servir archivos estáticos del frontend
app.use( express.static( path.join( __dirname, '../frontend' ) ) );

//Rutra raiz
app.get( '/', ( req, res ) => {
    res.sendFile( path.join( __dirname, '../frontend/index.html' ) );
} );

const fs = require('fs');
const bodyParser = require('body-parser');

// Middleware para JSON
app.use(bodyParser.json());

// Ruta para obtener platos
app.get('/api/platos', (req, res) => {
  const platos = JSON.parse(fs.readFileSync('./backend/data/platos.json'));
  res.json(platos);
});

// Ruta para agregar nuevo plato
app.post('/api/platos', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  const platos = JSON.parse(fs.readFileSync('./backend/data/platos.json'));
  platos.push({ nombre, precio });
  fs.writeFileSync('./backend/data/platos.json', JSON.stringify(platos, null, 2));
  res.status(201).json({ mensaje: 'Plato agregado correctamente' });
});

//iniciar el servidor
app.listen( PORT, () => {
    console.log( `Servidor corriendo en http://localhost:${PORT}` );
} );