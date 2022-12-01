import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
  <React.Fragment>
    <App />
  </React.Fragment>
  </Provider>,
  //Ya viene el index creado 'root' viene en el index de public
  document.getElementById('root')
);

