import React from "react";
import "../css/Tasks.css";

const Tasks = ({data, title}) =>{


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
    { data.length<1 ?
     
     <p className='loading'>No se cargaron tareas</p> : 

     data.map((item) => {
         return(
            <div key={item.fecha} className='task'>    
                <h1 className='taskTitle' >{item.tarea} </h1>
                
                <h1 className='taskDescription'>{item.descipcion}{item.descripcion}</h1>
                
                <h1 className='taskDays'>{getDays(item.fecha)}</h1> 
            </div>
         )
        })


    }
    
</div>
   
</div>
 ) 
}

export default Tasks;