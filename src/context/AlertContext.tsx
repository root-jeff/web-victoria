import { createContext } from "react";

// Define los tipos de alerta
export enum AlertType {
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

// Define la estructura de una alerta
export interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

// Define el tipo del contexto
export interface AlertContextType {
  alerts: Alert[];
  addAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: number) => void;
}

// Crea el contexto de alertas
export const AlertContext = createContext<AlertContextType>({
  alerts: [],
  addAlert: (type: AlertType, message: string) =>
    console.warn("No se ha proporcionado un proveedor de contexto de alertas"),
  removeAlert: (id: number) =>
    console.warn("No se ha proporcionado un proveedor de contexto de alertas"),
});
