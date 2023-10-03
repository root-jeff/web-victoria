// import React, { useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// const PolygonCreator: React.FC = () => {
//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
//   const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
//   const [storedPolygonData, setStoredPolygonData] = useState<
//     Array<{ lat: number; lng: number; fillColor: string }[]>
//   >([]);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src =
//       'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Ux4xHHWnNE0AcXXsmb1y-nzzoF4OMNY&libraries=drawing'; // Replace with your actual API key
//     script.async = true;
//     script.onload = initMap;
//     document.head.appendChild(script);

//     return () => {
//       if (map) {
//         google.maps.event.clearInstanceListeners(map);
//       }
//     };
//   }, []); // Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key

//   const initMap = () => {
//     const point = { lat: -2.3300533218811643, lng: -80.20984100719394 };
//     setMap(
//       new google.maps.Map(document.getElementById('map') as HTMLElement, {
//         center: point,
//         zoom: 15,
//         mapTypeId: google.maps.MapTypeId.SATELLITE,
//       })
//     );

//     const marker = new google.maps.Marker({
//       position: point,
//       map: map ? map : undefined, // Use conditional check for map
//       title: '¡Aquí estoy!',
//     });

//     drawingManagerRef.current = new google.maps.drawing.DrawingManager({
//       drawingMode: google.maps.drawing.OverlayType.POLYGON,
//       drawingControl: true,
//       drawingControlOptions: {
//         position: google.maps.ControlPosition.TOP_CENTER,
//         drawingModes: [google.maps.drawing.OverlayType.POLYGON],
//       },
//       polygonOptions: {
//         fillColor: '#ff0000', // Default color
//         fillOpacity: 0.35,
//         strokeWeight: 2,
//         editable: true,
//       },
//     });

//     drawingManagerRef.current.setMap(map);

//     google.maps.event.addListener(drawingManagerRef.current, 'overlaycomplete', (event) => {
//       if (event.type === google.maps.drawing.OverlayType.POLYGON) {
//         const polygon = event.overlay as google.maps.Polygon;
//         setPolygons((prevPolygons) => [...prevPolygons, polygon]);

//         polygon.setOptions({
//           fillColor: (document.getElementById('colorPicker') as HTMLInputElement).value,
//         });

//         google.maps.event.addListener(polygon.getPath(), 'set_at', savePolygons);
//         google.maps.event.addListener(polygon.getPath(), 'insert_at', savePolygons);
//         google.maps.event.addListener(polygon.getPath(), 'remove_at', savePolygons);
//         google.maps.event.addListener(polygon, 'click', () => {
//           const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
//           colorPicker.value = polygon.get('fillColor');
//         });

//         savePolygons();
//       }
//     });

//     loadSavedPolygons(); // Load previously saved polygons if any

//     const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
//     colorPicker.addEventListener('input', () => {
//       const selectedColor = colorPicker.value;
//       const selectedPolygon = polygons.find((polygon) => polygon.get('fillColor') === selectedColor);
//       if (selectedPolygon) {
//         selectedPolygon.setOptions({ fillColor: selectedColor });
//         savePolygons();
//       }
//     });
//   };

//   const savePolygons = () => {
//     const polygonData = polygons.map((polygon) => {
//       return polygon
//         .getPath()
//         .getArray()
//         .map((point) => ({ lat: point.lat(), lng: point.lng(), fillColor: polygon.get('fillColor') }));
//     });

//     setStoredPolygonData(polygonData);
//     console.log(polygonData);
//   };

//   const sendPolygonDataToServer = async () => {
//     const API_HOST = 'https://ff3c-181-188-200-216.ngrok-free.app/api';
//     const token = 'YOUR_AUTH_TOKEN'; // Replace with your actual authorization token

//     if (storedPolygonData.length > 0) {
//       const formattedData = storedPolygonData.map((polygon, index) => {
//         return {
//           poligono: {
//             Id_Lote: index + 1, // Option to assign an ID to each polygon
//             FillColor: polygon[0].fillColor,
//             Activo: true,
//           },
//           geocoordenadas: polygon.map((coord) => {
//             return {
//               lat: coord.lat,
//               lng: coord.lng,
//               Activo: true,
//             };
//           }),
//         };
//       });

//       try {
//         const response = await axios.post(`${API_HOST}/geolotes/`, formattedData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log('Polygon data sent successfully!', response.data);
//         setStoredPolygonData([]);
//       } catch (error) {
//         console.error('Error sending polygon data:', error);
//       }
//     } else {
//       console.log('No data to send.');
//     }
//   };

//   const loadSavedPolygons = () => {
//     // Load saved polygon data here and create polygons accordingly
//     // Example:
//     /* const savedPolygonData = [
//       [
//         { lat: -2.3266487216884397, lng: -80.21088310842896, fillColor: '#F39C12' },
//         { lat: -2.334195575443998, lng: -80.21362969046021, fillColor: '#F39C12' },
//         { lat: -2.3352246887287254, lng: -80.20358749990845, fillColor: '#F39C12' },
//         { lat: -2.3264772018150195, lng: -80.20225712423706, fillColor: '#F39C12' },
//       ],
//       // Add more polygons as needed
//     ]; */
//     // You can use the savedPolygonData to create the polygons similarly to what's done in the original code.
//   };

//   const handleColorChange = (color: string) => {
//     // Actualizar el color seleccionado en el estado del componente
//     const selectedPolygon = polygons.find((polygon) => polygon.get('fillColor') === color);
//     if (selectedPolygon) {
//       selectedPolygon.setOptions({ fillColor: color });
//       savePolygons();
//     }
//   };

//   return (
//     <div>
//       <div className="color-picker">
//         Color: <input type="color" id="colorPicker" value="#ff0000" onChange={(e) => handleColorChange(e.target.value)} />
//       </div>
//       <div id="map" style={{ height: '400px' }}></div>
//       <button onClick={sendPolygonDataToServer}>Guardar poligono</button>
//     </div>
//   );
// };

// export default PolygonCreator;
