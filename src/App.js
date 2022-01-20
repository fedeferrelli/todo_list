import React, {useState, useEffect} from 'react';
import db from "./firebase/config";

import { collection, getDocs } from "firebase/firestore";

import CargaDatos from '../src/pages/CargaDatos';

import ShowTasks from './pages/ShowTasks'



function App() {

  const [data, setData] = useState([])

  const [trigger, setTrigger] = useState(false)

  const [showForm, setShowForm] = useState(false)

   useEffect(() => {
    
    const getData = async() => {

    const querySnapshot = await getDocs(collection(db, "tareas"));

    const datos = [];

    querySnapshot.forEach((doc) => {

      datos.push(doc.data())
  /*  setData([...data, doc.data()]); */
}); 

  setData(datos)
}

getData()

  }, [trigger]) 


  return (
<>


    
  { showForm ?
  
  <CargaDatos 
      setTrigger = {setTrigger}
      trigger = {trigger}
      setShowForm={setShowForm}
    /> 
   :
   <ShowTasks
   data={data}
   setShowForm={setShowForm}
   />

  }
   </>    
    );
}

export default App;
