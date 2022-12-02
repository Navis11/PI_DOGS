import { createStore, applyMiddleware } from 'redux';
//comoseWithDevTools es una libreria que te hace ya no escribir el  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer';
//Redux thunk sirve para trabajar con todo lo que es la llamada asíncrona
import thunk from 'redux-thunk'; 


//En esta linea creaMos el store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))











