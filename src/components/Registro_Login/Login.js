import React, { useState } from 'react';

import {FiEyeOff, FiEye} from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';
import '../../css/registro_login.css';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const SettingEmail = (e) =>{
        setEmail(e)
        setMessage('')
    }

    const SettingPassword = (e) =>{
        setPassword(e)
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

        navigate("/tasks")
    }


    return (

        <>
        <div className='form'>
            <h1 className='titulo'> Iniciar Sesión</h1>
            
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

           <div className='botonera'>

                <input
                    className="submit-login"
                    type="submit"
                    value="Login"
                />
           </div>

            <div  className="login-register">¿No tenés una cuenta? <Link to="/" className="to-register" > Registrate </Link> </div>

         </div>
       </form>
     </div>
     </div>

     <div  className="login-register login-password"> <Link to="/recuperarPassword" className="to-password" > ¿Olvidaste tu contraseña? </Link> </div>


     <div>

            { message &&
                
                <div className='show-error'> 
            <h1 className="error-titulo">Error:</h1>

            <p className="error-mensaje">{message}</p>

            
            </div>}

        </div>

        <div className='botonera-google'>

        <input
                    className="google-login"
                    type="submit"
                    value="Login con Google"
                />
</div>

        </>
    )
}

export default Login
