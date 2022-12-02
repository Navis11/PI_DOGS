import React from 'react';

export default function Paginado ({breedsPerPage, allDogs, paginado}){
    const pageNumbers = []

    for (let i = 0; i <= Math.ceil(allDogs/breedsPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className='paginado'>
                {
                    pageNumbers && pageNumbers.map(number =>(
                        <li className='number' key={number}>
                            <a onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}