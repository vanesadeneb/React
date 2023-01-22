import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useCallback } from 'react';

export const DibujaPoligono = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBt4syi8lqaQnExCqRbZfDBAkqoLG_D31g"
      })
    
      const [map, setMap] = useState(null);
    
      const center = {
        lat: 24.886,
        lng:  -70.268
      };
    
      var mapOptions = {
        zoom: 5,
        center: center
      };
    
      const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.Map(document.getElementById('mapa'),mapOptions);
        //map.fitBounds(bounds);
        console.log(google.maps);
        // Polygon Coordinates
        const triangleCoords = [
        new google.maps.LatLng(25.774,-80.19),
        new google.maps.LatLng(18.466,-66.118),
        new google.maps.LatLng(32.321,-64.757),
        new google.maps.LatLng(25.774,-80.19)
      ];
    
      // Styling & Controls
      const myPolygon = new google.maps.Polygon({
        paths: triangleCoords,
        draggable: true, // turn off if it gets annoying
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