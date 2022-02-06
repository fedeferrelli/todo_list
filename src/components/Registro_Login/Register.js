import React, { useState, useContext } from 'react';
import { auth } from '../../firebase/config';

import { context } from '../../AuthContext/AuthContext'

import {FiEyeOff, FiEye} from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import '../../css/registro_login.css';

function Register() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const {handleRegister} = useContext(context)
     

    const SettingEmail = (e) =>{
        setEmail(e)
        setMessage('')
    }

    const SettingPassword = (e) =>{
        setPassword(e)
        setMessage('')
    }

    const SettingRepeatPassword = (e) =>{
      setRepeatPassword(e)
      setMessage('')
  }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(email.length < 5){
            setMessage("La dirección de correo debe tener al menos 5 caracteres") 
        }
        else if (password.length<6){
            setMessage("La contraseña debe tener al menos 6 caracteres")
        }
        else if (password !== repeatPassword){
          setMessage("Las contraseñas ingresadas no son idénticas")
      }
      else{
        handleRegister(auth, email, password)
        navigate("/tasks")
      }
      
    }


    return (

        <>
        <div className='form'>
            <h1 className='titulo'> Registro</h1>
            
            <div className="bloque">
       <form onSubmit={handleSubmit} className="form-body">
           
         <div className="bloque-big-screen">
           <div className="form-bloque">
             <label className="form-label" htmlFor="email">
               Correo Electrónico
             </label>

             <input
               className="form-input"
               id="email"
               type="text"
              onChange={(e) => SettingEmail(e.target.value)}
              
             />
           </div>

       
           <div className="form-bloque">
             <label className="form-label" htmlFor="password">
               Contraseña 
               
             </label>

             {showPassword ? <FiEyeOff className='password-icon' onClick = {(e) => setShowPassword(!showPassword)}/> :
                <FiEye className='password-icon' onClick = {(e) => setShowPassword(!showPassword)}/>} 

             <input
               className="form-input"
               id="password"
               type= {showPassword ? 'text' :  "password"}   
              
              onChange={(e) => SettingPassword(e.target.value)}
             />               
           </div>

           <div className="form-bloque">
             <label className="form-label" htmlFor="password">
               Repetir Contraseña 
               
             </label>

             {showPassword ? <FiEyeOff className='password-icon' onClick = {(e) => setShowPassword(!showPassword)}/> :
                <FiEye className='password-icon' onClick = {(e) => setShowPassword(!showPassword)}/>} 

             <input
               className="form-input"
               id="repeat-password"
               type= {showPassword ? 'text' :  "password"}   
              
              onChange={(e) => SettingRepeatPassword(e.target.value)}
             />               
           </div>

           <div className='botonera'>

                <input
                    className="submit-login"
                    type="submit"
                    value="Registrarme"
                />
           </div>

            <div  className="login-register">¿Ya tenés una cuenta? <Link to="/login" className="to-register"> Iniciá Sesión </Link> </div>

         </div>
       </form>
     </div>
     </div>




     <div>

            { message &&
                
                <div className='show-error'> 
            <h1 className="error-titulo">Error:</h1>

            <p className="error-mensaje">{message}</p>

            
            </div>}

        </div>

       
        </>
    )
}

export default Register
