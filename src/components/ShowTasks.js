import React, {useState, useEffect, useContext} from 'react';
import { context } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import {db} from '../firebase/config';

import Loading from './Loading';


import { collection, getDocs } from "firebase/firestore";


import Tasks from './Tasks';
import SearchAndAdd from './Search&Add'

import '../css/Tasks.css'

const ShowTasks = ({setTrigger, trigger}) =>{

    const [search, setSearch] = useState('')

    const [toDoData, setToDoData] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const [doneData, setDoneData] = useState([]);
   
    const [showLoading, setShowLoading] = useState(false);

    const {uid, signOutNow} = useContext(context);
   
    const navigate = useNavigate();

   

    const signOutRightNow = (e) =>{
        e.preventDefault();
        signOutNow()
        navigate('/')
    }

useEffect(() => {

  setShowLoading(true)

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, uid));

      const datos = [];

      querySnapshot.forEach((doc) => {
        const tareas = doc.data();
        tareas.id = doc.id;
        datos.push(tareas);
      });

      const dataOk = datos.filter(item => ( item.tarea.toLowerCase().includes(search.toLowerCase()) ||  item.descripcion.toLowerCase().includes(search.toLowerCase()) ))
      setShowLoading(false);
      setToDoData(dataOk.filter(task => task.estadio==='para hacer'))
      setProgressData(dataOk.filter(task => task.estadio==='progreso'))
      setDoneData(dataOk.filter(task => task.estadio==='hecho'))
     /*  */
    };
    
      getData();
      /*  */
  }, [trigger, uid, search]);

    


 return (

  
   <div style={{display: 'flex', flexDirection: 'column'}}> 


        { showLoading && <Loading/>}

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
        setShowLoading={setShowLoading}
        />
    
        <Tasks 
        data={progressData}
        title='Things In Progress'
        trigger = {trigger}
        setTrigger = {setTrigger}
        setShowLoading={setShowLoading}
         />
    
        <Tasks 
        data={doneData}
        title='Things Already Done'
        trigger = {trigger}
        setTrigger = {setTrigger}
        setShowLoading={setShowLoading}
         />
    
    </div>

    <button className='log-out' onClick={signOutRightNow}> cerrar sesión </button>

    </div>
        )
    };

export default ShowTasks;    