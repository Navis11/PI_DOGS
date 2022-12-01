import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreed } from '../actions';
import { Link } from 'react-router-dom';
import { Card } from './Card/Card.jsx';
//PI-Dogs-main\client\src\actions
export default function Home(){
    //Hacemos uso de hooks
    const dispatch = useDispatch()
    //Esto es hacer lo mismo que el map.state.props
    //me voy a traer en la constante todo lo que esta en el estado de allbreeds, allDogs ahora va a ser mi estado acá
    const allDogs = useSelector((state) => state.allbreeds)
    useEffect(() => {
        //dentro del useEffect despacho esa acción que me va a traer a los perris, osea, GET_BREED
        //Este dispatch es lo mismo que hacer el map.dispatch. props
        dispatch(getBreed());
    }, []) //Sgundo parámetro del useEffect es un array

    //Handlers se van a la carpeta de comtroladores, acá se hace esto para resetear, por si no salenlos perros cuando se soliciten
    function handleClick(e){
        e.preventDefault();
        dispatch(getBreed());
    }

    return (
        <div>
            <Link to= '/dogs'>Crear nueva raza</Link>
            <h1>Dogs' World</h1>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos los personajes
            </button>
            {/*Acá vamos a armar los filtros, estos también se van para mi carpeta de controllers*/}
            <div>
                {/*Primer ordenamiento, orden alfabético. El value dentro de options me permite acceder y preguntar después si el value es ascendente entonces haz algo, si es descendente haz otra cosa, pero lo que me va a permitir diferencia una opción de ota es el value que le asigne, este orden va a funcionar tanto para raza como para peso ambos pueden ir de más alto a más bajo, ascendente y descendente*/}
                <select>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                {/*Ahora vamos a crear el filtro por temperamento, acá tenemos que poner una lista desplegable con todos mis temperamentos,ponerla y llenar esta con todos y cada uno de ellos, dejo solo algunas opciones de referencia. Tengo que usar un map (desde la action) para traermelas todas y meterlas en la lista desplegable*/}
                <select>
                    {/*Le tengo que pasar como value, el mismo valor que tengo en la API, el value me va ayduar a hacer la lógica por detrás */}
                    <option value= 'All'>All</option>
                    <option value= 'Playful'>Playful</option>
                    <option value= 'Curious'>Curious</option>
                    <option value= 'Active'>Active</option>
                    <option value= 'Stubborn'>Stubborn</option>
                </select>
                {/*Segundo filtro, filtrar a las razoas creadas por nosotros en la BDD y a las que nos trajimos desde la API*/}
                <select>
                    <option value= 'All'>All</option>
                    <option value= 'Created'>Created</option>
                    <option value= 'Api'>Existent</option>
                </select>
                {/*Este componente card ya se trajo el estado global, ya tiene las propiedades que le vamos a pasar a card que es el nombre y eso */}
            {
                allDogs && allDogs.map(d => {
                    <Card name={d.name} image={d.image} temperament={d.temperament} weightMin={d.weightMin} weightMax={d.weightMax}/>
                })
            }
            </div>
        </div>
    )
}