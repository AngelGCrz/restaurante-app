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

//iniciar el servidor
app.listen( PORT, () => {
    console.log( `Servidor corriendo en http://localhost:${PORT}` );
} );