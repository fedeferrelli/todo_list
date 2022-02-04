import React from "react";

import { Link } from "react-router-dom";

import '../css/search&add.css'

const Search = ({setSearch}) =>{


    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

 

    return(

        <div className='search-and-add'>
       
        <input className='search'
        placeholder = 'Buscar'
        type = 'text'
        onChange={e=>onChange(e)}
        />

        <Link to="/cargarDatos" className='add-button'
        
        >Agregar Tarea</Link>

        </div>
    )
};

export default Search;