import React, { useState, useContext } from "react";

import { context } from "../../AuthContext/AuthContext";

import { Link } from "react-router-dom";

import Image from "../../assets/portrait.svg";

import "../../css/registro_login.css";

function RecuperarPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [succesMessage, setSuccesMessage] = useState("");

  const { passwordReset } = useContext(context);

  const SettingEmail = (e) => {
    setEmail(e);
    setMessage("");
  };

  /* const handleSubmit = async (e) => {
  e.preventDefault();

  if (email === "") {
    setMessage("Debés ingresar correo.");
    } else {
    try {
      await passwordReset(email);
      setSuccesMessage(
        "Te enviamos un mail a tu casilla. Recordá mirar el Spam"
      );
      console.log(email);
    } catch (err) {
      console.log(err.code);
      if (err.code === "auth/user-not-found") {
        setMessage(
          "El correo no corresponde a ninguno de nuestros usuarios."
        );
      } else if (err.code === "auth/invalid-email") {
        setMessage("El correo no es válido.");
      }
    }
  }
}; */

  console.log(email);
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (email === "") {
      setMessage("Debés ingresar un correo");
    } else {
      try {
        await passwordReset(email);
        setSuccesMessage(
          "Ya enviamos un correo a la casilla que ingresaste. Recordá mirar la carpeta de SPAM"
        );
      } catch (err) {
        console.log(err.code);

        if (err.code === "auth/invalid-email") {
          setMessage(
            "No puedes registarte con ese correo porque ya está en uso."
          );
        } else
          setMessage("Por favor verificá la dirección de correo ingresada.");
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="titulo-home">
          Bienvenido a la mejor manera de organizar tus tareas!
        </h1>
        <div className="screen">
          <div className="imagen-left">
            <img className="imagen" src={Image} alt="tasks" />
          </div>
          <div className="text-form-lr">
            <div className="login-register">
              <div className="form-lr">
                <h1 className="titulo-lr"> Recuperar Contraseña</h1>

                <div className="bloque-lr">
                  <form
                    onSubmit={handleSubmitPassword}
                    className="form-body-lr"
                  >
                    <div className="bloque-big-screen-lr">
                      <div className="form-bloque-lr">
                        <label className="form-label-lr" htmlFor="email">
                          Correo Electrónico
                        </label>

                        <input
                          className="form-input-lr"
                          id="email"
                          type="email"
                          onChange={(e) => SettingEmail(e.target.value)}
                        />
                      </div>

                      <div className="botonera-lr">
                        <input
                          className="submit-lr"
                          type="submit"
                          value="Recuperar"
                        />
                      </div>

                      <div className="login-register-lr">
                        ¿Te acordaste?{" "}
                        <Link to="/" className="to-register-login">
                          {" "}
                          Iniciá Sesión{" "}
                        </Link>{" "}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div>
              {message && (
                <div className="show-error-lr">
                  <h1 className="error-titulo-lr">Error:</h1>

                  <p className="error-mensaje-lr">{message}</p>
                </div>
              )}

              {succesMessage && (
                <div className="show-succes-lr">
                  <h1 className="succes-titulo-lr">Excelente!</h1>

                  <p className="succes-mensaje-lr">{succesMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarPassword;
