import React, {useState, useEffect, useContext} from 'react';
import { context } from '../AuthContext/AuthContext';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router';
import {db} from '../firebase/config';


import { collection, getDocs } from "firebase/firestore";


import Tasks from './Tasks';
import SearchAndAdd from './Search&Add'

import '../css/Tasks.css'

const ShowTasks = ({setTrigger, trigger}) =>{

    const [search, setSearch] = useState('')

    const [toDoData, setToDoData] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [doneData, setDoneData] = useState([]);
   
    const {uid, signOutNow} = useContext(context);
   
    const navigate = useNavigate();

   

    const signOutRightNow = (e) =>{
        e.preventDefault();
        signOutNow(auth)
        navigate('/')
    }

useEffect(() => {

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, uid));

      const datos = [];

      querySnapshot.forEach((doc) => {
        const tareas = doc.data();
        tareas.id = doc.id;
        datos.push(tareas);
      });

      const dataOk = datos.filter(item => ( item.tarea.toLowerCase().includes(search.toLowerCase()) ||  item.descripcion.toLowerCase().includes(search.toLowerCase()) ))
    
      setToDoData(dataOk.filter(task => task.estadio==='para hacer'))
      setProgressData(dataOk.filter(task => task.estadio==='progreso'))
      setDoneData(dataOk.filter(task => task.estadio==='hecho'))
    };

      getData();
  }, [trigger, uid, search]);

    


 return (
   <div style={{display: 'flex', flexDirection: 'column'}}> 

        <div className='.search-and-add'>
        <SearchAndAdd
        
        setSearch={setSearch}
        
        />
        </div>

    <div className='showTasks'> 
        <Tasks 
        data={toDoData}
        title='Things To Do'
        trigger = {trigger}
        setTrigger = {setTrigger} 
        />
    
        <Tasks 
        data={progressData}
        title='Things In Progress'
        trigger = {trigger}
        setTrigger = {setTrigger}
         />
    
        <Tasks 
        data={doneData}
        title='Things Already Done'
        trigger = {trigger}
        setTrigger = {setTrigger}
         />
    
    </div>

    <button className='log-out' onClick={signOutRightNow}> cerrar sesión </button>

    </div>
        )
    };

export default ShowTasks;    