import React from 'react';
import './App.css';
import {LandingPage} from '../LandingPage/LandingPage.jsx'
import {Home} from './components/Home/Home'
//Acá en App vamos a poner el Router
//BrowserRouter es para envolver toda la app y que toda mi app tenga acceso a rutas, Route es para definirlas y switch es para indicarle a donde debe de ririgirse cada ruta
import {BrowserRouter, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          <Route path= '/home' component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
