import React, { useState, useContext } from "react";
import { context } from "../../AuthContext/AuthContext";

import { db } from "../../firebase/config";

import { useNavigate } from "react-router-dom";

import { collection, addDoc } from "firebase/firestore";

import "../../css/cargaDatos.css";

const CargaDatos = ({ trigger, setTrigger, setShowLoading }) => {
  // States para los datos

  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estadio, setEstadio] = useState("para hacer");

  const [message, setMessage] = useState("");

  const { uid } = useContext(context);

  const navigate = useNavigate();

  // Función para cargar datos

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (tarea === "") {
      setMessage("Debés ingresar una tarea.");
    } else {
      try {
        await addDoc(collection(db, uid), {
          tarea: tarea,
          descripcion: descripcion,
          estadio: estadio,
          fecha: Date(),
          fecha2: Math.round(new Date()),
        });
        setShowLoading(true);
        setTarea("");
        setDescripcion("");
        setEstadio("para hacer");

        setTrigger(!trigger);
        navigate("/tasks");
      } catch (err) {
        console.error("Ocurrió un error al cargar la tarea: ", err);
      }
    }
  };

  const cancel = () => {
    setShowLoading(true);
    navigate("/tasks");
  };

  return (
    <div>
      <div className="form">
        <h1 className="titulo"> Agregar Nueva Tarea </h1>

        <div className="bloque">
          <form onSubmit={handleSubmit} className="form-body">
            <div className="bloque-big-screen">
              <div className="form-bloque">
                <label className="form-label" htmlFor="tarea">
                  Tarea
                </label>

                <textarea
                  className="form-input"
                  id="tarea"
                  type="text"
                  value={tarea}
                  onChange={(e) => setTarea(e.target.value)}
                  rows="1"
                />
              </div>

              <div className="form-bloque">
                <label className="form-label" htmlFor="descripcion">
                  Descripción
                </label>

                <textarea
                  className="form-input"
                  id="descripcion"
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows="2"
                />
              </div>
            </div>

            <div className="bloque-big-screen">
              <div className="form-bloque">
                <label className="estadio">
                  <div className="form-radio-button">
                    <input
                      className="radio-button"
                      name="estadio"
                      type="radio"
                      value="para hacer"
                      defaultChecked
                      onChange={(e) => setEstadio(e.target.value)}
                    />
                  </div>

                  <span className="form-label">Para hacer</span>
                </label>

                <label className="estadio">
                  <div className="form-radio-button">
                    <input
                      className="radio-button"
                      name="estadio"
                      type="radio"
                      value="progreso"
                      onChange={(e) => setEstadio(e.target.value)}
                    />
                  </div>
                  <span className="form-label">En Progreso</span>
                </label>

                <label className="estadio">
                  <div className="form-radio-button">
                    <input
                      className="radio-button"
                      name="estadio"
                      type="radio"
                      value="hecho"
                      onChange={(e) => setEstadio(e.target.value)}
                    />
                  </div>
                  <span className="form-label form-label-boton">Terminado</span>
                </label>
              </div>

              <div className="botonera">
                <input className="submit" type="submit" value="agregar tarea" />

                <button className="cancelar" onClick={() => cancel()}>
                  cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        {message && (
          <div className="show-error-lr">
            <h1 className="error-titulo-lr">Error:</h1>

            <p className="error-mensaje-lr">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargaDatos;
