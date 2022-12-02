import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreed } from '../../actions/actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Pagination/Pagination';

export default function Home(){
    //Hacemos uso de hooks, esto es para utilizar está constante para ir despachando mis acciones
    const dispatch = useDispatch()
    //Esto es hacer lo mismo que el map.state.props
    //me voy a traer en la constante todo lo que esta en el estado de allbreeds, allDogs ahora va a ser mi estado acá. Es un arreglo del estado. Esta constante me trae del reducer el estado allbreeds, ese estado va a tener a todas las razas de perros
    const allDogs = useSelector((state) => state.allbreeds)

    //PAGINADO---------------------------------------------------
    //Acá vamos a crear variables para mi paginado, son estados locales. Estamos guardando en currentPage/ setCurrentPage la página acutal, el usestate es uno por que empezamos en la primer página por lo tanto mi página actual en un principio es uno. 
    const [currentPage, setCurrentPage] = useState(1)
    //En esta otra constante que también es un estado local, estamos guardando, cuantas razas quiero yo por página
    const [breedsPerPage, setBreedsPerPage] = useState(8)
    //Declaro una constante con el índice de la ultima raza y esto va a ser, la página en la que estoy por la cantidad de razas por página
    const indexOfLastBreed = currentPage * breedsPerPage //8
    const indexOfFirstBreed =indexOfLastBreed - breedsPerPage //0
    //Hago otra variable que va a tener a las razas que están en la página actual. Con el slice vamos a tomar solo una porción de las razas que estoy pasando, 
    const currentBreeds = allDogs.slice(indexOfFirstBreed, indexOfLastBreed)

    //EXPLICACIÓN:
    //Pag 1  indice de mi primer raza = 0   indice de mi ultimo raza = 8 

    //Estando en la pág 1 le voy a decir que solo me muestre del indice del primer al indice de la ultima. Me va a devolver el slice un arreglo que me va a traer a los perros desde el indice 1 al 8

    //Pag 2  indice de mi primer raza = 9   indice de mi ultimo raza = 17
    
    //Esta es la constante que me va a ayudar con el renderizado, vamos a tomar la constate paginado y lo vamos arenderizar más abajo en el map de allDogs que me renderiza a toda la lista de perros
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //--------------------------------------------------------------


    useEffect(() => {
        //dentro del useEffect despacho esa acción que me va a traer a los perris, osea, GET_BREED
        //Este dispatch es lo mismo que hacer el map.dispatch. props
        dispatch(getBreed());
    },[dispatch]) //Sgundo parámetro del useEffect es un array

    //Handlers se van a la carpeta de comtroladores, acá se hace esto para resetear, por si no salenlos perros cuando se soliciten
    function handleClick(e){
        e.preventDefault();
        dispatch(getBreed());
    }

    return (
        <div>
            <Link to= '/dogs'>Create new breed</Link>
            <h1>Dogs' World</h1>
            <button onClick={e=> {handleClick(e)}}>
                Reload all dog breeds
            </button>
            {/*Acá vamos a armar los filtros, estos también se van para mi carpeta de controllers*/}
            <div>
                {/*Primer ordenamiento, orden alfabético. El value dentro de options me permite acceder y preguntar después si el value es ascendente entonces haz algo, si es descendente haz otra cosa, pero lo que me va a permitir diferencia una opción de ota es el value que le asigne, este orden va a funcionar tanto para raza como para peso ambos pueden ir de más alto a más bajo, ascendente y descendente*/}
                <select>
                    <option value= 'asc'>Ascending</option>
                    <option value= 'desc'>Descending</option>
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

                <Paginado breedsPerPage={breedsPerPage} allDogs={allDogs.length} paginado={paginado}/>

                {/*Este componente card ya se trajo el estado global, ya tiene las propiedades que le vamos a pasar a card que es el nombre y eso */}
                {allDogs?.map((d) => {
                        return(
                            <div>
                                <Link to ={'/home' + d.id}>
                                <Card name={d.name} image={d.image} temperament={d.temperament} weightMin={d.weightMin} weightMax={d.weightMax} id={d.id}/>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}