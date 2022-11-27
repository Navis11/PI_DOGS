//Importamos Modelos
const { Dog, Temperament } = require('../db.js')
//Importamos los controladores de la data que me va a traer todos los datos (API, DB)
const { getAllDogs } = require('./Data-controllers.js')
//Controlador para traer la info de los perros formateada o si hay un name en el query me trae el perro pedido
const getDogsByName = async (req, res) => {
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
};

//Función que me trae a los perros por ID
const getDogsById = async (req, res) => {
    const id = req.params.id;
    const totalDogs = await getAllDogs();
    //Si existe un id en paramas
    if(id){
      //filtramos por ID entre todos los perror traidos desde la API y la DB
        let dogId = await totalDogs.filter(d => d.id == id)
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send('Breed not found');
    }
}

//Función para crear un perro nuevo
const createDog =  async (req, res) => {
    const {
      name,
      heightMin,
      heightMax,
      weightMin,
      weightMax,
      breeds,
      lifeSpan,
      image,
      createdInDb,
      temperament
    } = req.body;
    try {
  
      if (name) {
        const newDog = await Dog.create({  // aca creo el perro con esto, se crea el registro en la bdd con los datos proporcionados mediante el formulario
          name,
          heightMin,
          heightMax,
          weightMin,
          weightMax,
          breeds,
          lifeSpan,
          image,
          createdInDb,
        });
        
        temperament.forEach(async (e) => {
          if (e) {
  
            const createdDb = await Temperament.findAll({  // se lo paso aparte porque tengo que hacer la relacion aparte
              where: { name: e },   // lo tengo que buscar en el modelo que tiene todas los temperamentos
  
            // si temperamento no existe crear y asociar, ademas de buscar el nombre
            });
            newDog.addTemperament(createdDb);
  
          }
  
        })
  
        return res.status(200).send("Dog Created");
      } else {
        return res.status(404).send("Could not create new dog");
      }
    } catch (error) {
      console.log(error);
    }
  };

//EXPORTO LO QUE CREO EN ESTE ARCHIVO Y VOY A UTILIAR EN OTRO
module.exports = { 
    getDogsByName,
    getDogsById,
    createDog 
}



