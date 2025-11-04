//:::::::::::::::::::::LOGICA:::::::::::::::::::::
const express = require('express');//importamos express
const app = express();//creamos una instancia de express
const morgan = require('morgan');//importamos morgan para ver las peticiones en consola
//:::::::::::::::::::::ROUTES:::::::::::::::::::::
const pokemon = require('./routes/pokemon');//importamos las rutas de pokemon
const user =  require('./routes/user');//importamos las rutas de user
//:::::::::::::::::::::MIDDLEWARES:::::::::::::::::::::
const auth = require('./middleware/auth');//importamos el middleware de autenticacion
const notFound = require('./middleware/NotFound');//importamos el middleware de ruta no encontrada
const welcome = require('./middleware/index');//importamos el middleware de bienvenida
const cors = require('./middleware/cors');//importamos el middleware de cors
//:::::::::::::::::::::CONFIGURACIONES:::::::::::::::::::::

app.use(morgan('dev'));//usamos morgan en modo desarrollo
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//:::::::::::::::::::::Inicio del servidor:::::::::::::::::::::

app.use(cors);

app.get(welcome);

app.use('/user', user);//definimos la ruta /user para las rutas de user

app.use(auth);

app.use('/pokemon', pokemon);//definimos la ruta /pokemon para las rutas de pokemon

app.use(notFound);

app.listen(process.env.PORT || 3000, () => { // Iniciamos el servidor en el puerto 3000
  console.log('Server is running on port 3000');
}); 

console.log(".:.:.:.:.:. inicializando servidor .:.:.:.:.:.");//mensaje iniciando servidor