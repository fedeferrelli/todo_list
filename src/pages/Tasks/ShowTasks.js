import React, { useState, useEffect, useContext } from "react";
import { context } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router";
import { db } from "../../firebase/config";
import FadeIn from "react-fade-in";

import { collection, getDocs } from "firebase/firestore";

import Tasks from "./Tasks";
import SearchAndAdd from "./Search&Add";

import "../../css/Tasks.css";

const ShowTasks = ({ setTrigger, trigger, setShowLoading }) => {
  const [search, setSearch] = useState("");

  const [toDoData, setToDoData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [doneData, setDoneData] = useState([]);

  const { uid, signOutNow } = useContext(context);

  const navigate = useNavigate();

  const signOutRightNow = (e) => {
    e.preventDefault();
    signOutNow();
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, uid));

      const datos = [];

      querySnapshot.forEach((doc) => {
        const tareas = doc.data();
        tareas.id = doc.id;
        datos.push(tareas);
      });

      const dataOk = datos.filter(
        (item) =>
          item.tarea.toLowerCase().includes(search.toLowerCase()) ||
          item.descripcion.toLowerCase().includes(search.toLowerCase())
      );

      dataOk.sort(
        (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
      setToDoData(dataOk.filter((task) => task.estadio === "para hacer"));
      setProgressData(dataOk.filter((task) => task.estadio === "progreso"));
      setDoneData(dataOk.filter((task) => task.estadio === "hecho"));
      setShowLoading(false);
    };

    getData();
  }, [trigger, uid, search, setShowLoading]);

  return (
    <FadeIn delay={1500}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className=".search-and-add">
          <SearchAndAdd setSearch={setSearch} />
        </div>

        <div className="showTasks">
          <Tasks
            data={toDoData}
            title="Para Hacer"
            trigger={trigger}
            setTrigger={setTrigger}
            setShowLoading={setShowLoading}
          />
          <Tasks
            data={progressData}
            title="En Progreso"
            trigger={trigger}
            setTrigger={setTrigger}
            setShowLoading={setShowLoading}
          />
          <Tasks
            data={doneData}
            title="Finalizadas"
            trigger={trigger}
            setTrigger={setTrigger}
            setShowLoading={setShowLoading}
          />
        </div>
        <button className="log-out" onClick={signOutRightNow}>
          {" "}
          cerrar sesi??n{" "}
        </button>
      </div>
    </FadeIn>
  );
};

export default ShowTasks;
