import React, {useState, useEffect} from 'react';

import Tasks from './Tasks';

import '../css/Tasks.css'

const ShowTasks = ({data}) =>{

    const [toDoData, setToDoData] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [doneData, setDoneData] = useState([]);

useEffect(() => {
    
    setToDoData(data.filter(task => task.estadio==='toDo'))
    setProgressData(data.filter(task => task.estadio==='progreso'))
    setDoneData(data.filter(task => task.estadio==='hecho'))

}, [data])

    


 return (
   <div className='showTasks'> 

        <Tasks 
        data={toDoData}
        title='Things To Do' 
        />
    
        <Tasks 
        data={progressData}
        title='Things In Progress'
         />
    
        <Tasks 
        data={doneData}
        title='Things Already Done'
         />
    
    </div>
        )
    };

export default ShowTasks;    