import React, {useState, useEffect} from 'react';
import db from "./firebase/config";

import { collection, getDocs } from "firebase/firestore";

import CargaDatos from '../src/pages/CargaDatos';
import Tasks from './pages/Tasks';
import ShowTasks from './pages/ShowTasks'



function App() {

  const [data, setData] = useState([])

  const [trigger, setTrigger] = useState(false)

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

    <ShowTasks
     data={data}
     />
    
 {  <CargaDatos 
      setTrigger = {setTrigger}
      trigger = {trigger}
    />}
   </>    
    );
}

export default App;
