import React, { useState,  useEffect} from "react";

const ToDo = ({data}) =>{

   /*  const [tarea, descripcion, estadio, fecha] = data[0]; */

   const dataToDo = data.filter(tarea => tarea.estadio === 'toDo')
   
   console.log(data)



 return(
     
<div>
    { data.length<1 ?
     
     'esperando' : 

     dataToDo.map((item) => {
         return(<h1 key={item.fecha}>{item.tarea} {item.descipcion} {item.estadio}</h1>)
     })


    }
    
</div>
   
 ) 
}

export default ToDo;