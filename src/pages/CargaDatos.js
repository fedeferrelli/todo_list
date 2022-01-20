import React, { useState} from "react";

import db from '../firebase/config'

import { collection, addDoc } from "firebase/firestore";

import "../css/cargaDatos.css";



const CargaDatos = ({trigger, setTrigger, setShowForm}) =>{

    // States para los datos
    
    const [tarea, setTarea] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estadio, setEstadio] = useState('toDo')


    // Función para cargar datos 

    const setData = async (event) => {

        event.preventDefault()

          try {
            await addDoc(collection(db, "tareas"), {
                tarea: tarea,
                descripcion: descripcion,
                estadio: estadio, 
                fecha: Date()
            });

            setTrigger(!trigger)
            
           
          } catch (e) {
            console.error("Ocurrió un error al cargar la tarea: ", e);
          }
          
          setTarea('');
          setDescripcion('');
          setEstadio('toDo')
          setShowForm(false)
      
      }

      const cancelAndBack = () =>{
        setShowForm(false)
      }

 return (
   <div className="form">
     {/* <div className="header"> */}
     <h1 className="titulo"> Agregar Nueva Tarea </h1>
     {/*  </div> */}

     <div className="bloque">
       <form onSubmit={setData} className="form-body">
         <div className="bloque-big-screen">
           <div className="form-bloque">
             <label className="form-label" htmlFor="tarea">
               Tarea
             </label>

             <textarea
               className="form-input"
               id="tarea"
               type="text"
               // placeholder="Nueva Tarea"
               value={tarea}
               onChange={(e) => setTarea(e.target.value)}
               rows="1"
             />
           </div>

           <div className="form-bloque">
             <label className="form-label" htmlFor="descripcion">
               Descripción
             </label>

             <textarea
               className="form-input"
               id="descripcion"
               type="text"
               // placeholder="Descripcion"
               value={descripcion}
               onChange={(e) => setDescripcion(e.target.value)}
               rows="2"
             />
           </div>
         </div>

         <div className="bloque-big-screen">
           <div className="form-bloque">
             <label className="estadio">
               <div className="form-radio-button">
                 <input
                   className="radio-button"
                   name="estadio"
                   type="radio"
                   value="toDo"
                   defaultChecked
                   onChange={(e) => setEstadio(e.target.value)}
                 />
               </div>

               <span className="form-label">Para hacer</span>
             </label>

             <label className="estadio">
               <div className="form-radio-button">
                 <input
                   className="radio-button"
                   name="estadio"
                   type="radio"
                   value="progreso"
                   onChange={(e) => setEstadio(e.target.value)}
                 />
               </div>
               <span className="form-label">En Progreso</span>
             </label>

             <label className="estadio">
               <div className="form-radio-button">
                 <input
                   className="radio-button"
                   name="estadio"
                   type="radio"
                   value="hecho"
                   onChange={(e) => setEstadio(e.target.value)}
                 />
               </div>
               <span className="form-label form-label-boton">Terminado</span>
             </label>
           </div>

           <div className='botonera'>

                <input
                    className="submit"
                    type="submit"
                    value="agregar tarea"
                />

                <button className="cancelar" onClick={cancelAndBack}>       
                    cancelar
                </button>

           </div>
         </div>
       </form>
     </div>
   </div>
 );   

};

export default CargaDatos;