import React, {useState, useEffect} from 'react';

import Tasks from './Tasks';
import SearchAndAdd from './Search&Add'

import '../css/Tasks.css'

const ShowTasks = ({data, setShowForm}) =>{

    const [search, setSearch] = useState('')

    const [toDoData, setToDoData] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [doneData, setDoneData] = useState([]);

useEffect(() => {

    const dataOk = data.filter(item => ( item.tarea.toLowerCase().includes(search.toLowerCase()) ||  item.descripcion.toLowerCase().includes(search.toLowerCase()) ))
    
    setToDoData(dataOk.filter(task => task.estadio==='toDo'))
    setProgressData(dataOk.filter(task => task.estadio==='progreso'))
    setDoneData(dataOk.filter(task => task.estadio==='hecho'))

}, [data, search])

    


 return (
   <div > 

        <div className='.search-and-add'>
        <SearchAndAdd
        
        setSearch={setSearch}
        setShowForm={setShowForm}
        />
        </div>

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

    </div>
        )
    };

export default ShowTasks;    