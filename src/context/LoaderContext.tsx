import React, { createContext, useContext, useState, ReactNode } from "react";
import { LoaderAnimation } from "./../views/Loader";
// Definir el tipo de estado del loader
type LoaderState = {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
};

// Crear el contexto de loader
export const LoaderContext = createContext<LoaderState | undefined>(undefined);

// Proveedor del contexto de loader
export const LoaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {isLoading && <LoaderAnimation />}
      {children}
    </LoaderContext.Provider>
  );
};
