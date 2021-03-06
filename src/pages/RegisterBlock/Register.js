import React, { useState, useContext } from "react";

import { context } from "../../AuthContext/AuthContext";

import { FiEyeOff, FiEye } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import Image from "../../assets/portrait.svg";

import "../../css/registro_login.css";

function Register({ setShowLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const { handleRegister } = useContext(context);

  const SettingEmail = (e) => {
    setEmail(e);
    setMessage("");
  };

  const SettingPassword = (e) => {
    setPassword(e);
    setMessage("");
  };

  const SettingRepeatPassword = (e) => {
    setRepeatPassword(e);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Debés ingresar correo y contraseña.");
    } else if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
    } else if (password !== repeatPassword) {
      setMessage("Las contraseñas ingresadas no son idénticas.");
    } else {
      try {
        await handleRegister(email, password);
        setShowLoading(true);
        navigate("/tasks");
      } catch (err) {
        console.log(err.code);

        if (err.code === "auth/email-already-in-use") {
          setMessage(
            "No puedes registarte con ese correo porque ya está en uso."
          );
        } else if (err.code === "auth/invalid-email") {
          setMessage("El correo no es válido.");
        } else
          setMessage(
            "Por favor verificá el correo y contraseña e intentá de nuevo."
          );
      }
    }
  };

  return (
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
              <h1 className="titulo-lr"> Registro</h1>

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
                        type="email"
                        onChange={(e) => SettingEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-bloque-lr">
                      <label className="form-label-lr" htmlFor="password">
                        Contraseña
                      </label>

                      {showPassword ? (
                        <FiEyeOff
                          className="password-icon-lr"
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FiEye
                          className="password-icon-lr"
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      )}

                      <input
                        className="form-input-lr"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => SettingPassword(e.target.value)}
                      />
                    </div>

                    <div className="form-bloque-lr">
                      <label className="form-label-lr" htmlFor="password">
                        Repetir Contraseña
                      </label>

                      {showPassword ? (
                        <FiEyeOff
                          className="password-icon-lr"
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FiEye
                          className="password-icon-lr"
                          onClick={(e) => setShowPassword(!showPassword)}
                        />
                      )}

                      <input
                        className="form-input-lr"
                        id="repeat-password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => SettingRepeatPassword(e.target.value)}
                      />
                    </div>

                    <div className="botonera-lr">
                      <input
                        className="submit-lr"
                        type="submit"
                        value="Registrarme"
                      />
                    </div>

                    <div className="login-register-lr">
                      ¿Ya tenés una cuenta?{" "}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
