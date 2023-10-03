// // GoogleMapsContext.tsx
// import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// // Definir la forma del contexto
// interface GoogleMapsContextType {
//     map: google.maps.Map | null;
//     initMap: () => void;
// }

// // Crear el contexto de Google Maps
// const GoogleMapsContext = createContext<GoogleMapsContextType | undefined>(
//     undefined
// );

// // Hook personalizado para acceder al contexto
// export const useGoogleMaps = () => {
//     const context = useContext(GoogleMapsContext);
//     if (!context) {
//         throw new Error('useGoogleMaps debe usarse dentro de un GoogleMapsProvider');
//     }
//     return context;
// };

// // Componente proveedor del contexto
// interface GoogleMapsProviderProps {
//     children: ReactNode;
//     containerId: string|null; // ID del contenedor del mapa
//     initialCoordinates: { lat: number; lng: number }; // Coordenadas iniciales
//     initialZoom: number; // Nivel de zoom inicial
// }

// export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
//     children,
//     containerId,
//     initialCoordinates,
//     initialZoom,
// }) => {
//     const [map, setMap] = useState<google.maps.Map | null>(null);

//     const initMap = () => {
//         const containerElement = containerId != null?document.getElementById(containerId):document.getElementById("map");
//         if (containerElement) {
//             const googleMap = new google.maps.Map(containerElement, {
//                 center: initialCoordinates,
//                 zoom: initialZoom,
//             });
//             setMap(googleMap);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('DOMContentLoaded', initMap);
//         return () => {
//             document.removeEventListener('DOMContentLoaded', initMap);
//         };
//     }, []);

//     return (
//         <GoogleMapsContext.Provider value={{ map, initMap }}>
//             {children}
//         </GoogleMapsContext.Provider>
//     );
// };
