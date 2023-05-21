// Importamos el framework Express y la biblioteca Mongoose
const express = require("express")
const mongoose =require('mongoose')

// Importamos el archivo que contiene las rutas para manejar personas
const personsRoutes=require("./routes/persons")

// Configuramos las variables de entorno para MongoDB
require('dotenv').config();

// Configuramos Mongoose para usar las promesas globales
mongoose.Promise = global.Promise;

// Creamos la instancia de la aplicación Express
const app = express();

// Configuramos el puerto de escucha
const port = process.env.PORT || 3000;

// Configuramos el motor de vistas para usar EJS
app.set("view engine", 'ejs');

// Configuramos la carpeta de vistas y archivos estáticos
app.set('views', './views')
app.use('/assets', express.static(__dirname + '/../public'));

// Configuramos el middleware para analizar datos de formulario
app.use(express.urlencoded({extended:false}));

// Usamos el router de personas para manejar las rutas
app.use(personsRoutes);

// Conectamos a la base de datos MongoDB usando la variable de entorno
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Conectado a MongoDB"))
.catch((error)=>console.error(error));

// Iniciamos el servidor y lo ponemos a escuchar en el puerto configurado
app.listen(port,()=>console.log(`Escuchando en el puerto ${port}`));
