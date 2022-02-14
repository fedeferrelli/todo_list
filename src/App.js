import React, { useState } from "react";

import CargaDatos from "./pages/CargaDatos/CargaDatos";

import ShowTasks from "./pages/Tasks/ShowTasks";

import Login from "./pages/RegisterBlock/Login";

import Register from "./pages/RegisterBlock/Register";

import RecuperarPassword from "./pages/RegisterBlock/RecuperarPassword";

import Loading from "./components/Loading";

import NotFoundPage from "./components/NotFoundPage";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./AuthContext/AuthContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [trigger, setTrigger] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        {showLoading && <Loading />}

        <Routes>
          <Route
            path="/"
            element={<Login setShowLoading={setShowLoading} />}
          ></Route>

          <Route
            path="/register"
            index
            element={<Register setShowLoading={setShowLoading} />}
          ></Route>

          <Route
            path="/recuperarPassword"
            element={<RecuperarPassword />}
          ></Route>

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <ShowTasks
                  trigger={trigger}
                  setTrigger={setTrigger}
                  showLoading={showLoading}
                  setShowLoading={setShowLoading}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/cargarDatos"
            element={
              <ProtectedRoute>
                <CargaDatos
                  setTrigger={setTrigger}
                  trigger={trigger}
                  setShowLoading={setShowLoading}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
