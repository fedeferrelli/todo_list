import React, { useState } from "react";

import { FiEyeOff, FiEye } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import "../../css/registro_login.css";

function RecuperarPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [succesMessage, setSuccesMessage] = useState("");

  const navigate = useNavigate();

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

    navigate("/login");
  };

  return (
    <>
      <div className="form">
        <h1 className="titulo"> Recuperar Contraseña</h1>

        <div className="bloque">
          <form onSubmit={handleSubmit} className="form-body">
            <div className="bloque-big-screen">
              <div className="form-bloque">
                <label className="form-label" htmlFor="email">
                  Correo Electrónico
                </label>

                <input
                  className="form-input"
                  id="email"
                  type="text"
                  onChange={(e) => SettingEmail(e.target.value)}
                />
              </div>

              <div className="botonera">
                <input
                  className="submit-login"
                  type="submit"
                  value="Recuperar"
                />
              </div>

              <div className="login-register">
                ¿te acordaste?{" "}
                <Link to="/login" className="to-register">
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
