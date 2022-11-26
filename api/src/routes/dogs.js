//Me traigo router de express
const { Router } = require('express');
const router = Router();
//Me traigo lo que voy a necesitar de los controllers de Dogs
const { getDogsByName, getDogsById, createDog } = require('../controllers/Dog-controllers.js')

//Modularizado
//router.get('/', funcion)
//Esta ruta hace la función de la ruta principal y la de búsqueda por nombre, me va a traer a todos los perris, así como por nombre tanto de la API como de la bdd
router.get('/', getDogsByName)

//Ruta para la búsqueda por ID
//Traer perris tanto de la bdd como de la API, 
router.get('/:id', getDogsById)

//Post para crear una nueva raza de perro
router.post("/", createDog);

module.exports = router