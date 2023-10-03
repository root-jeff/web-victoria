import { useState } from "react";
import { Card } from "./Card";
import { GenericForm } from "./Form";

interface CardLoginProps {
  onLogin: (username: string, password: string) => void;
}

export const CardLogin = ({ onLogin }: CardLoginProps) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    // Realiza alguna lógica de autenticación aquí
    onLogin(formData.username, formData.password);
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <Card title="Iniciar Sesión" footer={null}>
      <GenericForm
        fields={[
          {
            name: "username",
            label: "Nombre de Usuario",
            bclass: "form-control",
            placeholder: "Nombre de usuario",
            value: formData.username, // Establece el valor de username desde el estado formData
            onChange: (value) => handleInputChange("username", value), // Maneja los cambios en el username
          },
          {
            name: "password",
            label: "Contraseña",
            bclass: "form-control",
            placeholder: "Contraseña",
            type: "password",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("password", value), // Maneja los cambios en el password
          },
          {
            name: "remenber",
            bclass: "form-check-input",
            type: "checkbox",
            label: "Recordarme?",
            value: formData.password, // Establece el valor de password desde el estado formData
            onChange: (value) => handleInputChange("password", value), // Maneja los cambios en el password
          },
        ]}
        onSubmit={handleLogin}
      />
    </Card>
  );
};
