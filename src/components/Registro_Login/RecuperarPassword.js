import React, { useState, useContext } from "react";

import { auth } from "../../firebase/config";

import { context } from "../../AuthContext/AuthContext";


import { Link} from "react-router-dom";

import "../../css/registro_login.css";

function RecuperarPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [succesMessage, setSuccesMessage] = useState("");

  const { passwordReset } = useContext(context)

 

  const SettingEmail = (e) => {
    setEmail(e);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.length < 5) {
      setMessage("La dirección de correo debe tener al menos 5 caracteres");
    }

    setSuccesMessage(
      "Te hemos enviado un mail a tu casilla. Recuerda mirar el Spam"
    );
    passwordReset(auth, email)
   
  };

  return (
    <>
      <div className="form-lr">
        <h1 className="titulo-lr"> Recuperar Contraseña</h1>

        <div className="bloque-lr">
          <form onSubmit={handleSubmit} className="form-body-lr">
            <div className="bloque-big-screen-lr">
              <div className="form-bloque-lr">
                <label className="form-label-lr" htmlFor="email">
                  Correo Electrónico
                </label>

                <input
                  className="form-input-lr"
                  id="email"
                  type="text"
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
                ¿te acordaste?{" "}
                <Link to="/" className="to-register-lr">
                  {" "}
                  Iniciá Sesión{" "}
                </Link>{" "}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        {message && (
          <div className="show-error">
            <h1 className="error-titulo">Error:</h1>

            <p className="error-mensaje">{message}</p>
          </div>
        )}

        {succesMessage && (
          <div className="show-succes">
            <h1 className="succes-titulo">Excelente!</h1>

            <p className="succes-mensaje">{succesMessage}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default RecuperarPassword;