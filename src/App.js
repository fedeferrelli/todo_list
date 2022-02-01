import React, { useState, useEffect } from "react";
import db from "./firebase/config";

import { collection, getDocs } from "firebase/firestore";

import CargaDatos from "./components/CargaDatos";

import ShowTasks from "./components/ShowTasks";



function App() {
  const [data, setData] = useState([]);

  const [trigger, setTrigger] = useState(false);

  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "tareas"));

      const datos = [];

      querySnapshot.forEach((doc) => {
        const tareas = doc.data();
        tareas.id = doc.id;
        datos.push(tareas);
      });

      setData(datos);
    };

    getData();
  }, [trigger]);

  return (
    <div>
      {showForm ? (
        <CargaDatos
          setTrigger={setTrigger}
          trigger={trigger}
          setShowForm={setShowForm}
        />
      ) : (
        <ShowTasks
          data={data}
          setShowForm={setShowForm}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      )}
    </div>
  );
}

export default App;
