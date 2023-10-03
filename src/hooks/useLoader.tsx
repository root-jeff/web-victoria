import { useContext } from "react";
import { LoaderContext } from "./../context/LoaderContext";

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader debe usarse dentro de un LoaderProvider");
  }
  return context;
};
