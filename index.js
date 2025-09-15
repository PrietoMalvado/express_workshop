const express = require('express');//importamos express
const app = express();//creamos una instancia de express
const { pokemon } = require('./pokedex.json');//importamos el archivo json de pokemones


app.get('/', (req, res, next) => {
  res.status(200);//codigo de estado
  res.send('bienvenido al pokedex');// mensaje de envio del pokemon.json
});

app.get('/pokemon/all', (req, res, next) => {
  res.status(200);//codigo de estado
  res.send(pokemon);// envio del archivo json (GETALL POKEMON)
});

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) => {
  const id = req.params.id - 1;//convertir en un entero para que no sea texto parseInt
  if (id >= 0 && id <= 150){
      res.status(200);//codigo de estado
      res.send(pokemon[req.params.id - 1]);// envio del archivo json (UNIQUE POKEMON ID)
  }
  else {
      res.status(404);//codigo de estado
      res.send("El pokemon no encontrado");// mensaje de error si el pokemon no se encuentra
  }
});

app.get('/pokemon/name/:name', (req, res, next) => { //buscamos el pokemon por nombre
  const name = req.params.name;
  for (i = 0; i < pokemon.length; i++) {
      if (pokemon[i].name.toLowerCase() === name.toLowerCase()) {//entrada en minuscula y busqueda en miniscula para evitar errores.
          res.status(200); //codigo de estado
          return res.send(pokemon[i]); //envio del pokemon en iteraccion dentro del json (UNIQUE POKEMON NAME)
      }
  }
  res.status(404); //codigo de estado
  res.send("El pokemon no encontrado atributo name"); //mensaje de error si el pokemon no se encuentra
});

app.listen(process.env.PORT || 3000, () => { // Iniciamos el servidor en el puerto 3000
  console.log('Server is running on port 3000');
}); 

console.log(".:.:.:.:.:. inicializando servidor .:.:.:.:.:.");//mensaje hola mundo express