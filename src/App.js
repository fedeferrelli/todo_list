import React, { useState, useEffect, useContext } from "react";

import CargaDatos from "./components/CargaDatos";

import ShowTasks from "./components/ShowTasks";

import Login from "./components/Registro_Login/Login";

import Register from "./components/Registro_Login/Register"
import RecuperarPassword from "./components/Registro_Login/RecuperarPassword";

import { AuthProvider } from './AuthContext/AuthContext'

import { BrowserRouter, Routes, Route } from 'react-router-dom'



function App() {
  const [data, setData] = useState([]);

  const [trigger, setTrigger] = useState(false);


 
  

  



/* useEffect(() => {

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db,'hoXsjCEGg7QJ2bVAfJaxlW8mJAw2'));

      const datos = [];

      querySnapshot.forEach((doc) => {
        const tareas = doc.data();
        tareas.id = doc.id;
        datos.push(tareas);
      });

       setData(datos);
    };

      getData();
  }, [trigger]); */



  return (

    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Register />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/recuperarPassword"
          element={<RecuperarPassword />}
        ></Route>

        <Route
          path="/tasks"
          element={
            <ShowTasks
             
              trigger={trigger}
              setTrigger={setTrigger}
            />
          }
        ></Route>

        <Route
          path="/cargarDatos"
          element={
            <CargaDatos
              setTrigger={setTrigger}
              trigger={trigger}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
  }

export default App;
