import React, {useContext} from "react";
import { context } from "../AuthContext/AuthContext";


import { useNavigate } from "react-router-dom";

import '../css/search&add.css'

const Search = ({setSearch}) =>{



    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const {user} = useContext(context)

const navigate = useNavigate();  
const addTask = () =>{
    navigate("/cargarDatos")
}
    
 

    return(

        <div className='search-and-add'>
       
        <input className='search'
        placeholder = 'Buscar'
        type = 'text'
        onChange={e=>onChange(e)}
        />

<button className="add-button" onClick={addTask}>
          {" "}
          Agregar Tarea{" "}
        </button>

        <div className='user' > {user} </div>

        </div>
    )
};

export default Search;