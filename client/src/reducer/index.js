import {
    GET_BREED,
/*  GET_DETAIL,
    GET_TEMPERAMENTS,
    FILTER,
    SEARCH_BY_NAME,
    SORT,
    SET_CURRENT_PAGE, */
  } from "../actions/actions_types";

//Declaramos una constante que va a contener todos nuestros estados los cuales vamos a querer modificar dentro de la aplicaión
const initialState = {
    allbreeds: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_BREED:
            return{
                ...state,
                //Acá le decimos que lo que me regrese la función get breed me lo va a guardar en el initialstate que por ahora es un arreglo vacío
                allbreeds: action.payload
            }
            default:
                return state;
    }
}

export default rootReducer