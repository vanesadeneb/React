import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

const center = {
  lat: 29.3333300,
  lng: -110.6666700
};

const mapOptions = {
  zoom: 7,
  center: center
};

export const DibujaPoligono = ({ poligonos }) => {
  
  //const [coordenadas, setCoordenadas] = useState(poligonos.geom);
  const transformandoCadena = poligonos[0].geom.slice(poligonos[0].geom.indexOf("(") + 2, poligonos[0].geom.indexOf(")") - 2);
  const coordenadas = transformandoCadena.split(",");
  
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBt4syi8lqaQnExCqRbZfDBAkqoLG_D31g"
      })
    
      const [map, setMap] = useState(null);
    
      const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.Map(document.getElementById('mapa'),mapOptions);
        //console.log(google.maps);
        
        // Polygon Coordinates
        const triangleCoords = coordenadas.map( (puntos) => {
          const LatLng = puntos.split(" ");
          return new google.maps.LatLng(Number(LatLng[0]), Number(LatLng[1]))
          }
        );
        
        //console.log(triangleCoords);
    
      // Styling & Controls
      const myPolygon = new google.maps.Polygon({
        paths: triangleCoords,
        draggable: true,
        editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });
    
        myPolygon.setMap(bounds);

      }, [])
    
      const onUnmount = useCallback((map) => {
        setMap(null)
      }, [])
      
      
      return isLoaded ? (
          <GoogleMap
            id="mapa"
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
          </GoogleMap>
      ) : <></>
}