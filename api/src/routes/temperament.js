//Me traigo router de express
const { Router } = require('express');
const router = Router();
//Me traigo lo que voy a necesitar de los controllers de Temperament
const { getApiTemperaments } = require('../controllers/Temperament-controller.js')

//GET TEMPERRAMENTS de la API, LOS GUARDAMOS EN LA BDD
router.get("/", async (req, res) => {  
  
    try {
          const temp = await getApiTemperaments()
            res.status(200).send(temp);
         
        } catch (error) {
          console.log(error)
        }
      });

module.exports = router