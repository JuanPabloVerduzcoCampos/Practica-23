// Importamos la librería Mongoose
const mongoose = require("mongoose");

// Creamos un esquema de Mongoose para el modelo 'Person'
let PersonSchema = new mongoose.Schema({
    nombre:String,
    edad:Number,
    tipoSangre:String,
    nss:String,
});

// Exportamos el modelo 'Persons' para que pueda ser utilizado en otras partes de la aplicación
module.exports= mongoose.model('Persons',PersonSchema);
