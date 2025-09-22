const express = require('express');//importamos express
const app = express();//creamos una instancia de express
const { pokemon } = require('./pokedex.json');//importamos el archivo json de pokemones

//:::::::::::::::::::::MIDDLEWARES:::::::::::::::::::::

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//:::::::::::::::::::::METODO GET:::::::::::::::::::::

app.get('/', (req, res, next) => {
   return res.status(200).send('bienvenido al pokedex');// mensaje de envio del pokemon.json
});

app.get('/pokemon', (req, res, next) => {
  return res.status(200).send(pokemon);// envio del archivo json (GETALL POKEMON)
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
  const id = req.params.id - 1;//convertir en un entero para que no sea texto parseInt
  (id >= 0 && id <= 150) ? res.status(200).send(pokemon[req.params.id - 1]) : res.status(404).send("El pokemon no encontrado");// mensaje de error si el pokemon no se encuentra
});

app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => { //buscamos el pokemon por nombre
  const name = req.params.name;
  const pk = pokemon.filter((p) => { //funcion filter para filtrar el nombre del pokemon
      return (p.name.toUpperCase() === name.toUpperCase()) && p; // ignorar mayusculas y minusculas
  });
  (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokemon no encontrado");// mensaje de error si el pokemon no se encuentra
});

//:::::::::::::::::::::METODO POST:::::::::::::::::::::

app.post('/pokemon', (req, res, next) => {
   return res.status(200).send(req.body);// mensaje de envio del pokemon post
});

//:::::::::::::::::::::Inicio del servidor:::::::::::::::::::::

app.listen(process.env.PORT || 3000, () => { // Iniciamos el servidor en el puerto 3000
  console.log('Server is running on port 3000');
}); 

console.log(".:.:.:.:.:. inicializando servidor .:.:.:.:.:.");//mensaje iniciando servidor