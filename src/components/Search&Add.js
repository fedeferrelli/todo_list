import React, {useContext} from "react";
import { context } from "../AuthContext/AuthContext";


import { Link } from "react-router-dom";

import '../css/search&add.css'

const Search = ({setSearch}) =>{



    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const {user} = useContext(context)

  

    
 

    return(

        <div className='search-and-add'>
       
        <input className='search'
        placeholder = 'Buscar'
        type = 'text'
        onChange={e=>onChange(e)}
        />

        <Link to="/cargarDatos" className='add-button'
        
        >Agregar Tarea</Link>

        <div className='user' > {user} </div>

        

        </div>
    )
};

export default Search;