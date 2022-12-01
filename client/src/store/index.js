import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer';
//Redux thunk sirve para trabajar con todo lo que es la llamada asíncrona
import thunk from 'redux-thunk';

//comoseWithDevTools es una libreria que te hace ya no escribir el  WINDOWS_ BLA
//En esta linea creaMos el store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

