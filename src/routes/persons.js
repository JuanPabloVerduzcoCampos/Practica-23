const express = require("express"); // Importa la librería Express
const router = express.Router(); // Crea una instancia del enrutador de Express
const mongoose = require("mongoose"); // Importa la librería Mongoose para conectarse a MongoDB
let Person = require('../models/persons'); // Importa el modelo 'Person' para interactuar con la base de datos

// Manejador de la ruta GET '/gente'
router.get('/gente', async (req, res) => {
    const Persons = await Person.find({}); // Busca todos los documentos en la colección 'Person'
    res.render('persons.ejs', { Persons }); // Envia los documentos pero ahora con el formato echo en ejs
})

// Manejador de la ruta GET '/addPerson'
router.get('/addPerson', (req, res) => { // Ruta para mostrar la vista para agregar una nueva persona
    res.render(('addPerson'));
});

// Manejador de la ruta POST '/addPerson'
router.post('/addPerson', (req, res) => { // Ruta para procesar el formulario para agregar una nueva persona
    const newPerson = Person({ // Crea un nuevo objeto 'Person' con los datos proporcionados en el formulario
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    });

    newPerson // Guarda el nuevo objeto 'Person' en la base de datos
        .save()
        .then((data) => { res.redirect('/gente') }) // Redirige al usuario a la página de 'gente'
        .catch((error) => { res.json({ message: error }) })
})

// Manejador de la ruta GET '/findById/:id'
router.get('/findById/:id', (req, res) => { // Ruta para mostrar la vista para actualizar los datos de una persona
    Person.findById(req.params.id) // Busca la persona con el id especificado en la base de datos
        .then((myPerson) => { res.render('personUpdate', { myPerson }) }) // Renderiza la vista para actualizar los datos de la persona
        .catch((error) => { res.json({ message: error }) });
});

// Manejador de la ruta POST '/updatePerson'
router.post('/updatePerson', (req, res) => { // Ruta para procesar el formulario para actualizar los datos de una persona
    Person.findByIdAndUpdate(req.body.objId, { // Actualiza los datos de la persona con los valores proporcionados en el formulario
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
        }).then((data) => { res.redirect('/gente') }) // Redirige al usuario a la página de 'gente'
        .catch((error) => { res.json({ message: error }) });
});
// Manejador de la ruta GET '/deletePerson/:id'
router.get('/deletePerson/:id',(req,res)=>{
    Person.findByIdAndDelete(req.params.id) 
    .then((data)=>{res.redirect('/gente')}) 
    .catch((error)=>{res.json({message:error})}); 
});

// Manejador de la ruta POST '/find'
router.post('/find',(req,res)=>{
    Person.find({nombre:{$regex: req.body.criteria, $options:"i"} } ) 
    .then((Persons)=>{res.render('persons', {Persons})}) 
    .catch((error)=>{res.json({message:error})}); 
});

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
