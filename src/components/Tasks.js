import React from "react";
import "../css/Tasks.css";
import db from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { MdDeleteForever } from 'react-icons/md';


const Tasks = ({data, title, trigger, setTrigger}) =>{


     const deleteTask = (id, tarea) => {
        
        console.log(trigger)
        if(window.confirm(`¿estás seguro que queres elminar ${tarea.toUpperCase()}?`) )

        
        
        { try {
            deleteDoc(doc(db, "tareas", id));
            setTrigger(!trigger)
            console.log(trigger)
            console.log('ya borró')
         } catch (error) {
             console.log(error)    
         }} 
    } 

    const actualizeTask = (id, tarea, estadioFinal) => {
        if(window.confirm(`¿estás seguro que queres actualizar ${tarea.toUpperCase()} a ${estadioFinal.toUpperCase()}`) )
        
        { try {
            updateDoc(doc(db, "tareas", id), {

                estadio: estadioFinal
              });
              
            setTrigger(!trigger)
            console.log(trigger)
            console.log('ya modificó')
         } catch (error) {
             console.log(error)    
         }} 
    } 


    
    



const getDays = (date) =>{
   const days = (new Date().getTime()-new Date(date).getTime())/(1000*60*60*24);
   return(`Creado hace ${parseInt(days)} dias`)
}    

 return(

<div className='tasks'>    

<h1 className ={title==='Things To Do' ? 'titleToDo' :
                title==='Things In Progress' ? 'titleProgress':
                'titleDone' } >{title}</h1>
     
<div className="container">

<div className='tasks-number-conteiner'>
    <div className='tasks-number'>{data.length}</div>
</div>

    { data.length<1 ?
     
     <p className='loading'>No se cargaron tareas</p> : 

     data.map((item) => {
         return(
            <div key={item.fecha} className='task'>    
                <h1 className='taskTitle' >{item.tarea}</h1>
                
                <h1 className='taskDescription'>{item.descipcion}{item.descripcion}</h1>
                
                <h1 className='taskDays'>{getDays(item.fecha)}</h1> 

<div className='delete-change'>
                <button
                className='delete'
                onClick={()=>deleteTask(item.id, item.tarea)}
                ><MdDeleteForever className='delete-icon' /></button>

                
                <div className='change-estadio-container'>
                <button
                className='change-estadio'
                onClick={()=>actualizeTask(item.id, item.tarea, 

                    title==='Things To Do' ? 'progreso' :
                    title==='Things In Progress' ? 'para hacer':
                    'para hacer' )}

                >
                    {(title==='Things To Do' ? 'progreso' :
                    title==='Things In Progress' ? 'para hacer':
                    'para hacer')}
                </button>
                </div>

                <div className='change-estadio-container'>
                <button
                className='change-estadio'
                onClick={()=>actualizeTask(item.id, item.tarea, 
                    title==='Things To Do' ? 'hecho' :
                    title==='Things In Progress' ? 'hecho':
                    'progreso' )}
                >{(title==='Things To Do' ? 'hecho' :
                title==='Things In Progress' ? 'hecho':
                'progreso')} </button>

                </div>

                </div>

            </div>
         )
        })


    }
    
</div>
   
</div>
 ) 
}

export default Tasks;