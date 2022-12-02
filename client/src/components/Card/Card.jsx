import React from 'react';
import './Card.css';

//La card va a renderizar cada raza de perro que necesito
export default function Card({image, name, temperament, weightMin, weightMax}){
    return(
        <div className = 'card'>
            <img src ={image} className = 'img-c' alt= 'imgage not found' width= '200px' height='250px' />
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <h5>{weightMin}</h5>
            <h5>{weightMax}</h5>
        </div>
    );
}