import React, {useContext} from "react";
import { context } from "../AuthContext/AuthContext";
import { auth } from "../firebase/config";

import { Link, useNavigate } from "react-router-dom";

import '../css/search&add.css'

const Search = ({setSearch}) =>{

    const navigate = useNavigate();

    const onChange = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const {user, signOutNow} = useContext(context)

    const signOutRightNow = (e) =>{
        e.preventDefault();
        signOutNow(auth)
        navigate('/login')
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

        <div className='user' > {user} </div>

        

        </div>
    )
};

export default Search;