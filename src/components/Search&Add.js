import React from "react";

import '../css/search&add.css'

const Search = ({setSearch, setShowForm}) =>{


    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const showForm = () =>{
        setShowForm(true)
    }

    return(

        <div className='search-and-add'>
       
        <input className='search'
        placeholder = 'Buscar'
        type = 'text'
        onChange={e=>onChange(e)}
        />

        <button className='add-button'
        onClick={showForm}
        >Agregar Tarea</button>

        </div>
    )
};

export default Search;