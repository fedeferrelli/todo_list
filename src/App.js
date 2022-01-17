import React, {useState, useEffect} from 'react';
import db from "./firebase/config";

import { collection, getDocs } from "firebase/firestore";

import CargaDatos from '../src/pages/CargaDatos';
import ToDo from '../src/pages/ToDo'



function App() {

  const [data, setData] = useState([]);

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

  }, []) 


console.log(data)
  return (

    <ToDo data={data} />
   /*  <CargaDatos/ > */
    
    
    );
}

export default App;
