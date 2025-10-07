const express = require('express');//importamos express
const app = express();//creamos una instancia de express
const morgan = require('morgan');//importamos morgan para ver las peticiones en consola
const pokemon = require('./routes/pokemon');//importamos las rutas de pokemon

//:::::::::::::::::::::MIDDLEWARES:::::::::::::::::::::

app.use(morgan('dev'));//usamos morgan en modo desarrollo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//:::::::::::::::::::::Inicio del servidor:::::::::::::::::::::

app.get('/', (req, res, next) => {
   return res.status(200).json({code: 1, message:'Bienvenido al pokedex'});// mensaje de envio del pokemon.json
});

app.use('/pokemon', pokemon);//definimos la ruta /pokemon para las rutas de pokemon

app.use('/', (req, res, next ) => {
    return res.status(404).json({code: 404, message:'URL no encontrado'});// mensaje de error si la ruta no existe
});

app.listen(process.env.PORT || 3000, () => { // Iniciamos el servidor en el puerto 3000
  console.log('Server is running on port 3000');
}); 

console.log(".:.:.:.:.:. inicializando servidor .:.:.:.:.:.");//mensaje iniciando servidor