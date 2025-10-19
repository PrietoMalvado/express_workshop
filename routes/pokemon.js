const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

//:::::::::::::::::::::METODO POST:::::::::::::::::::::

pokemon.post('/', async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;//desestructuramos el body
  if( pok_name && pok_height && pok_weight && pok_base_experience){
      let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
      query += ` VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;//consulta a la base de datos
      const rows = await db.query(query);//ejecutamos la consulta
      console.log(rows);
      (rows.affectedRows == 1) ? res.status(201).json({code: 201, message:'Pokemon insertado correctamente'})
      : res.status(500).json({code: 500, message:'Ocurrio un error, pokemon no insertado'});
  }
  return res.status(500).json({code: 500, message:'Error, campos incompletos'});
});

//:::::::::::::::::::::METODO DELETE:::::::::::::::::::::

pokemon.delete('/:id([0-9]{1,3})', async (req, res, next) => {
  const query = ` DELETE FROM pokemon WHERE pok_id =${req.params.id} `;//consulta a la base de datos
  const rows = await db.query(query);//ejecutamos la consulta
  (rows.affectedRows == 1) ? res.status(200).json({code: 200, message:'Pokemon eliminado correctamente'})
  : res.status(404).json({code: 500, message:'Ocurrio un error, pokemon no encontrado'});
});

//:::::::::::::::::::::METODO PUT:::::::::::::::::::::

pokemon.put('/:id([0-9]{1,3})', async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;//desestructuramos el body
  if( pok_name && pok_height && pok_weight && pok_base_experience){
      let query = `UPDATE pokemon SET pok_name='${pok_name}',pok_height=${pok_height},`;
      query += `pok_weight=${pok_weight},pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id} `;//consulta a la base de datos
      const rows = await db.query(query);//ejecutamos la consulta
      console.log(rows);
      if (rows.affectedRows == 1){ 
        return res.status(200).json({code: 200, message:'Pokemon actualizado correctamente'})
      }
      else { 
        return res.status(500).json({code: 500, message:'Ocurrio un error, pokemon no actualizado'}); 
      }
  }
  return res.status(500).json({code: 500, message:'Error, campos incompletos'});
});

//:::::::::::::::::::::METODO PATCH:::::::::::::::::::::

pokemon.patch('/:id([0-9]{1,3})', async (req, res, next) => {
  const { pok_name } = req.body;//desestructuramos el body
  if (pok_name) {
      let query = `UPDATE pokemon SET pok_name='${pok_name}' WHERE pok_id=${req.params.id} `;//consulta a la base de datos
      const rows = await db.query(query);//ejecutamos la consulta
      console.log(rows);
      if (rows.affectedRows == 1){ 
        return res.status(200).json({code: 200, message:'Pokemon actualizado correctamente'})
      }
      else { 
        return res.status(500).json({code: 500, message:'Ocurrio un error, pokemon no actualizado'}); 
      }
  }
  return res.status(500).json({code: 500, message:'Error, campos incompletos'});
});

//:::::::::::::::::::::METODO GET:::::::::::::::::::::

pokemon.get('/', async (req, res, next) => {
  const pkmn = await db.query('SELECT * FROM pokemon') //consulta a la base de datos
  return res.status(200).json({code: 1, message: pkmn });// envio del archivo json (GETALL POKEMON)
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
  const id = parseInt(req.params.id);//convertir entero
  const pkm = await db.query('SELECT * FROM pokemon WHERE pok_id = ?', [id]); //consulta a la base de datos
  (id >= 1 && id <= 750 && pkm.length > 0) ? res.status(200).json({code: 1, message: pkm[0] }) 
  : res.status(404).json({code: 404, message:'Pokemon no encontrado'});// mensaje de error si el pokemon no se encuentra
});
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => { //buscamos el pokemon por nombre
  const name = req.params.name;//obtenemos el nombre del pokemon
  const pkm = await db.query('SELECT * FROM pokemon WHERE pok_name = ?', [name]); //consulta a la base de datos
  const pkmn = pkm.filter(p => p.pok_name.toUpperCase() === name.toUpperCase()); //filtramos el pokemon por nombre sin importar mayusculas o minusculas
  (pkmn.length > 0) ? res.status(200).json({code: 1, message: pkmn }) 
  : res.status(404).send({code: 404, message:'Pokemon no encontrado'});// mensaje de error si el pokemon no se encuentra
});

module.exports = pokemon; //exportamos el modulo