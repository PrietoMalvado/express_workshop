const express = require('express');//importamos express
const JWT = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

//:::::::::::::::::::::METODO POST USER:::::::::::::::::::::

user.post('/', async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;//desestructuramos el body
    if( user_name && user_mail && user_password){
        let query = "INSERT INTO user(user_name, user_mail, user_password)"; 
        query += `VALUES ('${user_name}','${user_mail}','${user_password}')`;//consulta a la base de datos
        const rows = await db.query(query);//ejecutamos la consulta
        if (rows.affectedRows == 1){ 
            return res.status(201).json({code: 201, message:'Usuario registrado correctamente'})
        }
        return res.status(500).json({code: 500, message:'Ocurrio un error, usuario no registrado'});
    }
    return res.status(500).json({code: 500, message:'Error, campos incompletos'});
});

//:::::::::::::::::::::METODO GET USER:::::::::::::::::::::

user.get('/', async (req, res, next) => {
    const query = ` SELECT * FROM user `;//consulta a la base de datos
    const rows = await db.query(query);//ejecutamos la consulta
    return res.status(200).json({code: 200, message: rows});
});

user.post('/login', async (req, res, next) => {
    const { user_mail,  user_password } = req.body;//desestructuramos el body
    const query = ` SELECT * FROM user WHERE user_mail='${user_mail}' AND user_password='${user_password}' `;//consulta a la base de datos
    const rows = await db.query(query);//ejecutamos la consulta
    if(user_mail && user_password){
        if (rows.length == 1) {
            const token = JWT.sign({
                user_id : rows[0].user_id,
                user_mail : rows[0].user_mail
            }, "debugkey", { expiresIn: '1h' });

            return res.status(200).json({code: 200, message: token});
        }else{
            return res.status(401).json({code: 401, message: "Usuario o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message:'Error, campos incompletos'});
});

module.exports = user; //exportamos el modulo
