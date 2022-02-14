import React, { useState, useContext } from "react";
import { context } from "../../AuthContext/AuthContext";

import { FiEyeOff, FiEye } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import Image from "../../assets/portrait.svg";
import "../../css/registro_login.css";

function Login({ setShowLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const { handleSignIn, handleSubmitGoogle } = useContext(context);

  const navigate = useNavigate();

  const SettingEmail = (e) => {
    setEmail(e);
    setMessage("");
  };

  const SettingPassword = (e) => {
    setPassword(e);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setMessage("Debés ingresar correo y contraseña.");
    } else if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres.");
    } else {
      try {
        await handleSignIn(email, password);
        setShowLoading(true);
        navigate("/tasks");
      } catch (err) {
        console.log(err.code);

        if (err.code === "auth/wrong-password") {
          setMessage(
            "El correo y la contraseña no coinciden. Por favor volvé a intentar."
          );
        } else if (err.code === "auth/user-not-found") {
          setMessage(
            "El correo no corresponde a ninguno de nuestros usuarios."
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

  const handleSubmitWithGoogle = async (e) => {
    e.preventDefault();

    await handleSubmitGoogle();
    setShowLoading(true);
    navigate("/tasks");
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
              <h1 className="titulo-lr"> Iniciar Sesión</h1>

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

                    <div className="botonera-lr">
                      <input
                        className="submit-lr"
                        type="submit"
                        value="Login"
                      />
                    </div>

                    <div className="login-register-lr">
                      ¿No tenés una cuenta?{" "}
                      <Link to="/register" className="to-register-login">
                        {" "}
                        Registrate{" "}
                      </Link>{" "}
                    </div>
                  </div>
                </form>
              </div>

              <div className="login-register-lr login-password-lr">
                {" "}
                <Link to="/recuperarPassword" className="to-register-login">
                  {" "}
                  ¿Olvidaste tu contraseña?{" "}
                </Link>{" "}
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

            <div className="botonera-google-lr">
              <input
                className="google-login-lr"
                type="submit"
                value="Login con Google"
                onClick={handleSubmitWithGoogle}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
