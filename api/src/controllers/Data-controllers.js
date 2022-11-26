//Nos traemos la API_KEY
const { API_KEY } = process.env;
//Nos traemos los modelos
const { Dog, Temperament } = require('../db.js')
//Insatalamos e importamos axios
const axios = require('axios');

//función para traerme la info de los perris que necesito de la API
const getApiInfo = async () =>{
    try{
        const getDogs = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const getInfoDogs = await getDogs.data.map(d =>{
            let height = d.height.metric.split("-")
            let weight = d.weight.metric.split("-")
            return{
                id: d.id,
                name: d.name,
                heightMin: parseInt(height[0]),
                heightMax: parseInt(height[1]),
                weightMin: parseInt(weight[0]),
                weightMax: parseInt(weight[1]),
                breeds: d.breed_group,
                lifeSpan: d.life_span,
                image: d.image.url ? d.image.url : "Image not found",
                temperament: d.temperament
            }
        })
        //console.log(getApiInfo)
        return getInfoDogs;
    } catch(e){
        console.log(e);
    }
}

//Traigo a los perros de la db con su temperamento incluido
const getDbInfo = async () => {
    try{
    const dogsDb = await Dog.findAll({
        //el include funciona como si fuera un join entre la tabla Dogs
        // y la tabla temper, por medio del name que es la raza
        include:{ 
            model: Temperament, //incluye datos del modelo temperament
            attributes: ['name'], //me trae el name de temperamento
            through:{
                attributes: [], // supuestamente acá los manda
            },
        }
    });

    const newDb = dogsDb.map((d) => {
        // mapeo los nuevos datos que me traje de mi db
        return {
            id: d.id,
            image: d.image,
            name: d.name,
            heightMin: parseInt(d.heightMin),
            heightMax: parseInt(d.heightMax),// aca es donde yo puedo cambiarle en el front algun detalle determinado
            weightMin: parseInt(d.weightMin),
            weightMax: parseInt(d.weightMax),
            breeds: d.breeds,
            life_span: d.life_span + " years",
            temperament: d.temperaments.map((d) => d.name) // este cuando haga el temperamen me va hacer falta  para   el get de temperamentos
        }
    })
    return newDb
    }catch(e){
        console.log(e)
    }
}

//Me traigo a todos lo perris de la bdd y la API y la junto concatenandolas, hacemos uso de las dos funciones anteriores, getApiInfo y getDbInfo
const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo; 
}

//EXPORTO LO QUE CREO EN ESTE ARCHIVO Y VOY A UTILIAR EN OTRO
module.exports = { 
    getApiInfo, 
    getDbInfo, 
    getAllDogs,
}