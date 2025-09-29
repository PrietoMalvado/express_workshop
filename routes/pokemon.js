const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

//:::::::::::::::::::::METODO POST:::::::::::::::::::::

pokemon.post('/', (req, res, next) => {
   return res.status(200).send(req.body);// mensaje de envio del pokemon post
});

//:::::::::::::::::::::METODO GET:::::::::::::::::::::

pokemon.get('/', async (req, res, next) => {
  const pkmn = await db.query('SELECT * FROM pokemon') //consulta a la base de datos
  return res.status(200).json(pkmn);// envio del archivo json (GETALL POKEMON)
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
  const id = parseInt(req.params.id);//convertir entero
  const pkm = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]); //consulta a la base de datos
  
  (id >= 1 && id <= 150 && pkm.length > 0) ? res.status(200).json(pkm[0]) : res.status(404).send("El pokemon no encontrado");// mensaje de error si el pokemon no se encuentra
});
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => { //buscamos el pokemon por nombre
  const name = req.params.name;//obtenemos el nombre del pokemon
  const pkm = await db.query('SELECT * FROM pokemon WHERE pok_name = ?', [name]); //consulta a la base de datos
  const pkmn = pkm.filter(p => p.pok_name.toUpperCase() === name.toUpperCase()); //filtramos el pokemon por nombre sin importar mayusculas o minusculas
  (pkmn.length > 0) ? res.status(200).json(pkmn) : res.status(404).send("Pokemon no encontrado");// mensaje de error si el pokemon no se encuentra
});

module.exports = pokemon; //exportamos el modulo