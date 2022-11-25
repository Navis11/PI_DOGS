const { Router } = require('express');
// Importar todos los routers;
const Dog = require('./dogs.js');
const Temperament = require('./temperament.js');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', Dog)
router.use('/temperaments', Temperament)

module.exports = router;
