const {
    GET_BREED,
    GET_DETAIL,
    GET_TEMPERAMENTS,
    FILTER,
    SEARCH_BY_NAME,
    SET_CURRENT_PAGE,
    SORT  
  } = require("./actions_types");

  const axios = require("axios");
  //HOME
  //Vamos a hacer todas las acciones que vamos a necesitar para nuestro HOME, según el readme, osea, que se tiene que poder hacer en el home
  //crear actions creators
  //TRAER A LOS PERRIS: Ruta principal, traer a los perros, necesitamos hacer un llamado al localhost:3000, va a ser una función asíncrona
  //Para traer a los perros tenemos quehacer un llamado a la ruta del back que creamos que trae a los perros, ES ACÁ CUANDO SUCEDE LA CONEXIÓN ENTRE EL FRONT Y EL BACK
  //Este creador de acciones ya me devleve una acción que tiene un type. Lo que nos regresa es un llamado a la función dispatch con el objeto acción dentro, ahora necesitamos pasarle ese dispatch al reducer para que haga el cambio en el store. El reducer es el que hace el cambio
  export const getBreed = () => {
    //devolvemos una función asíncrona
    return async function(dispatch){
      var json = await axios.get('http://localhost:3001/dogs');
      return dispatch({
        type: GET_BREED,
        payload: json.data
      })
    }
  }