import React, { useState,  useEffect} from "react";

import db from '../firebase/config'
import { doc, setDoc } from "firebase/firestore";

import "../css/cargaDatos.css";



const CargaDatos = () =>{

    // States para los datos
    
    const [tarea, setTarea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estadio, setEstadio] = useState('')


    // Función para cargar datos 

    const setData = async (event) => {

        event.preventDefault()

        await setDoc(doc(db, "tareas", Date()), {
            tarea: {tarea},
            descipcion: {descripcion},
            estadio: {estadio}, 
            fecha: Date()
          });

          setTarea('');
          setDescripcion('');
          setEstadio('toDo')
      
      }

console.log(tarea)
console.log(descripcion)
console.log(estadio)

 return(

    <div className="form">

<>
        <div className="header">
            <h1 className="titulo"> Nueva Tarea </h1>
        </div>

        <div className="bloque">

           


                <form
               onSubmit={setData}
               className="form-body"
                >
                   
                   <div className="bloque-big-screen">
                    <div className="form-bloque">
                        
                        <label className="form-label" htmlFor="tarea">Tarea</label>

                        <textarea className="form-input"
                        id="tarea"
                        type="text"
                       // placeholder="Nueva Tarea"
                        value={tarea}
                        onChange={(e)=>setTarea(e.target.value)}
                        rows="1"
                       
                        />

                    </div>

                    

                    <div className="form-bloque">
                        <label className="form-label" htmlFor="descripcion">Descripción</label>

                        <textarea className="form-input"
                        id="descripcion"
                        type="text"
                       // placeholder="Descripcion"
                        value={descripcion}
                        onChange={(e)=>setDescripcion(e.target.value)}
                        rows="1"
                        
                       
                        />

                    </div>

                    </div>

                    <div className="bloque-big-screen">

                    <div className="form-bloque">
                        
                        <div className="botonera">

                            <label>
                        
                            <input className="form-button"
                            name="estadio"
                            type="radio"
                            value="toDo"
                            defaultChecked
                            onChange={(e)=>setEstadio(e.target.value)}                                        
                            />

                            <span className="form-label form-label-boton" >Para hacer</span>
                            </label>
                        </div>

                        <div className="botonera">

                            <label>
                            <input className="form-button"
                                name="estadio"
                                type="radio"
                                value="progreso"
                                onChange={(e)=>setEstadio(e.target.value)}                 
                            />

                            <span className="form-label form-label-boton" >En Progreso</span>

                            </label>

                        
                       </div>

                       <div className="botonera">

                           <label>

                            <input className="form-button"
                                name="estadio"
                                type="radio"
                                value="hecho"
                                onChange={(e)=>setEstadio(e.target.value)}                    
                            />

                                                        
                            <span className="form-label form-label-boton" >Terminado</span>
                            </label>
                       </div>

                    </div>



                    <input className="submit"
                    type="submit"
                   // className=" bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 hover:text-yellow-500"
                    value="agregar tarea"/>

                    <button 
                    
                    className="submit cancelar"
                   //onClick={setData}
                    > cancelar </button>
</div>
                </form>
           
        </div>

        </>


    </div>




 )   

};

export default CargaDatos;