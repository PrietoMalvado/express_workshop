const express = require('express');//importamos express
const app = express();//creamos una instancia de express

app.get('/', (req, res, next) => {
  res.status(200);//codigo de estado
  res.send('Bienvenido a mi servidor Express');//mesanje de bienvenida
});

app.listen(3000, () => { // Iniciamos el servidor en el puerto 3000
  console.log('Server is running on port 3000');
}); 

/* Verbos HTTP
GET
POST
PUT
DELETE
PATCH
*/

console.log("hola mundo");//mensaje hola mundo express
