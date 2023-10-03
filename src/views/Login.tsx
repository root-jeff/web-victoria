import React, { useContext } from "react";
import { CardLogin } from "../components/CardLogin";
import { AlertContext, AlertType } from "../context/AlertContext";
import { Alert } from "../context/Alerts/AlertComponent";
import { useLoader } from "../hooks/useLoader";

export const Login = () => {
  const { addAlert } = useContext(AlertContext); // Accede al contexto de alertas
  const { isLoading, showLoader, hideLoader } = useLoader();
  const handleLogin = (username: string, password: string) => {
    // Realiza la lógica de autenticación aquí, por ejemplo:
    if (username === "admin" && password === "123") {
      /* addAlert(AlertType.SUCCESS, 'Inicio de sesión exitoso'); */
      //alert('Inicio de sesión exitoso');
      showLoader();
    } else {
      alert("Nombre de usuario o contraseña incorrectos");
    }
  };
  return (
    <div>
      <CardLogin onLogin={handleLogin}></CardLogin>
    </div>
  );
};
