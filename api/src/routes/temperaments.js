//Me traigo router de express
const { Router } = require('express');
const router = Router();
//Me traigo lo que voy a necesitar de los controllers de Temperament
const { getApiTemperaments } = require('../controllers/Temperament-controllers.js')

//GET TEMPERRAMENTS de la API, LOS GUARDAMOS EN LA BDD
router.get("/", getApiTemperaments );

module.exports = router