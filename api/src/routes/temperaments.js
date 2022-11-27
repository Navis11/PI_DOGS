//Importamos Router de express
const { Router } = require('express');
const router = Router();
//Importo los controladores de Temperament
const { getApiTemperaments } = require('../controllers/Temperament-controllers.js')

//Traemos los temperamentos de la API y los guardamos en la DB
router.get("/", getApiTemperaments );

module.exports = router