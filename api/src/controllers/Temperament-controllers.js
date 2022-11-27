//Importamos Modelos
const { Temperament } = require('../db.js')
//Traemos función de controllers que me va a traer las cosas de la API unicamente
const { getApiInfo } = require('./Data-controllers.js')

const getApiTemperaments = async (req, res) => {
    try{
    // el  '?' es un opcional chaining  me permite encadenar cosas  porque JS se rompe 
    const apiTemperaments = await getApiInfo();
    const temperamentList = apiTemperaments.map((el) => el.temperament?.split(", ")).flat();
    // quita los 'sub arrays'
    const temperament = [...new Set(temperamentList)];
    // el set te devuelve uno solo si es que existen elementos repetidos

    temperament.forEach(async element => {
        if (element) {
            Temperament.findOrCreate({
                where: { name: element }
            });
        }
    });
    let allTemp = await Temperament.findAll()
    res.status(200).send(allTemp)
    return allTemp

    } catch(e){
        console.log(e)
    }
}

module.exports = { getApiTemperaments }
