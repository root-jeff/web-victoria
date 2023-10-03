import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
//import { GoogleMapsProvider } from './context/MapContext';
import { LoaderProvider } from "./context/LoaderContext";
import { AlertContext } from "./context/AlertContext";
import { AlertProvider } from "./context/Alerts/AlertProvider";
ReactDOM.render(
  <React.StrictMode>
    <LoaderProvider>
      <AlertProvider>
        <AuthProvider>
          {/* <GoogleMapsProvider
            containerId="map-container"
            initialCoordinates={{ lat: 0, lng: 0 }}
            initialZoom={8}>
          </GoogleMapsProvider> */}
          <App />
        </AuthProvider>
      </AlertProvider>
    </LoaderProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
