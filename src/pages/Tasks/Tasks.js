import React, { useContext } from "react";
import { context } from "../../AuthContext/AuthContext";

import "../../css/Tasks.css";

import { db } from "../../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { MdDeleteForever } from "react-icons/md";

const Tasks = ({ data, title, trigger, setTrigger, setShowLoading }) => {
  const { uid } = useContext(context);

  const deleteTask = async (id, tarea) => {
    if (
      window.confirm(`¿estás seguro que queres eliminar ${tarea.toUpperCase()}?`)
    ) {
      try {
        setShowLoading(true);
        await deleteDoc(doc(db, uid, id));
        setTrigger(!trigger);
      } catch (error) {
        console.log(error);
        setTrigger(!trigger);
      }
    }
  };

  const actualizeTask = async (id, tarea, estadioFinal) => {
    if (
      window.confirm(
        `¿estás seguro que queres actualizar ${tarea.toUpperCase()} a ${estadioFinal.toUpperCase()}`
      )
    ) {
      try {
        setShowLoading(true);
        await updateDoc(doc(db, uid, id), {
          estadio: estadioFinal,
        });

        setTrigger(!trigger);
      } catch (error) {
        console.log(error);
        setTrigger(!trigger);
      }
    }
  };

  const getDays = (date) => {
    const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

    var rtf = new Intl.RelativeTimeFormat(navigator.language, {
      numeric: "auto",
    });

    if (seconds > 2635200) return rtf.format(-seconds / 2635200, "months");
    else if (seconds > 86400)
      return rtf.format(-Math.round(seconds / 86400), "days");
    else if (seconds > 3600)
      return rtf.format(-Math.round(seconds / 3600), "hours");
    else if (seconds > 60)
      return rtf.format(-Math.round(seconds / 60), "minutes");
    else return rtf.format(-Math.round(seconds), "seconds");
  };

  return (
    <div className="tasks">
      <h1
        className={
          title === "Para Hacer"
            ? "titleToDo"
            : title === "En Progreso"
            ? "titleProgress"
            : "titleDone"
        }
      >
        {title}
      </h1>

      <div className="container">
        <div className="tasks-number-conteiner">
          <div className="tasks-number">{data.length}</div>
        </div>

        {data.length < 1 ? (
          <p className="loading">No se cargaron tareas</p>
        ) : (
          data.map((item) => {
            return (
              <div key={item.fecha} className="task">
                <h1 className="taskTitle">{item.tarea}</h1>

                <h1 className="taskDescription">
                  {item.descipcion}
                  {item.descripcion}
                </h1>

                <h1 className="taskDays">{getDays(item.fecha)}</h1>

                <div className="delete-change">
                  <button
                    className="delete"
                    onClick={() => deleteTask(item.id, item.tarea)}
                  >
                    <MdDeleteForever className="delete-icon" />
                  </button>

                  <div className="change-estadio-container">
                    <button
                      className="change-estadio"
                      onClick={() =>
                        actualizeTask(
                          item.id,
                          item.tarea,

                          title === "Para Hacer"
                            ? "progreso"
                            : title === "En Progreso"
                            ? "para hacer"
                            : "para hacer"
                        )
                      }
                    >
                      {title === "Para Hacer"
                        ? "progreso"
                        : title === "En Progreso"
                        ? "para hacer"
                        : "para hacer"}
                    </button>
                  </div>

                  <div className="change-estadio-container">
                    <button
                      className="change-estadio"
                      onClick={() =>
                        actualizeTask(
                          item.id,
                          item.tarea,
                          title === "Para Hacer"
                            ? "hecho"
                            : title === "En Progreso"
                            ? "hecho"
                            : "progreso"
                        )
                      }
                    >
                      {title === "Para Hacer"
                        ? "hecho"
                        : title === "En Progreso"
                        ? "hecho"
                        : "progreso"}{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Tasks;
