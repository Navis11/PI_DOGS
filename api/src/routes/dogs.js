//Me traigo router de express
const { Router } = require('express');
const router = Router();
//Me traigo lo que voy a necesitar de los controllers de Dogs
const { getAllDogs } = require('../controllers/Dog-controller.js')
//Me traigo mis modelitos
const { Dog, Temperament } = require('../db')

//Esta ruta hace la función de la ruta principal y la de búsqueda por nombre, me va a traer por nombre los perris tanto de la API como de la bdd
router.get('/', async (req, res) => {
    //si dentro del query hay un ?name=... se va a guardar en la const name
    const name = req.query.name;
    //llamamos a la función getAllDogs del controller, que me trae a todos los perris tanto de la API como de la bdd
    let totalDogs = await getAllDogs();
    //Si existe un name dentro del request hacemos entramos al siguiente if
    if (name){
        //A todo lo que traemos con getAllDogs (API Y DB) le hacemos un filter que incluya el name pasado por request
        let dogName = await totalDogs.filter( d => d.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        //si el filtro arroja algo se regresa un estatus
        res.status(200).send(dogName) :
        res.status(404).send('Breed not found')
    }else{
        res.status(200).send(totalDogs);
    }
})

//Ruta para la búsqueda por ID
//Traer perris tanto de la bdd como de la API, 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const totalDogs = await getAllDogs();
    if(id){
        let dogId = await totalDogs.filter(d => d.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send('Breed not found');
    }
})

//Post para crear una nueva raza de perro
router.post("/", async (req, res) => {
    const {
      name,
      height,
      weight,
      lifeSpan,
      image,
      //createdInDb,
      temperament,
    } = req.body;
    try {
  
      if (name) {
        const newDog = await Dog.create({  // aca creo el perro con esto
          name,
          height,
          weight,
          lifeSpan,
          image,
          createdInDb,
        });
  
        temperament.forEach(async (e) => {
          if (e) {
  
            const createdDb = await Temperament.findAll({  // se lo paso aparte porque tengo que hacer la relacion aparte
              where: { name: e },   // lo tengo que buscar en el modelo que tiene todas los temperamentos
  
              // si temperamento no existe crear y asociar, ademas de buscar el nombre, 
            });
            newDog.addTemperament(createdDb);
  
          }
  
        })
  
        return res.status(200).send("Dog Created");
      } else {
        return res.status(404).send("Dog Not Created");
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router