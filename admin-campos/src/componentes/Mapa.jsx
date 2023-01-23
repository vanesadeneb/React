import React, { useState,  useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

export const Mapa = ({onSetGeom}) => {
//  console.log(latLng);
  const [coordenadas, setCoordenadas] = useState([[29.37081,-111.30189],[29.17015,-111.35099],[29.20282,-110.95376]]);
  const [coords, setCoords] = useState([]);
  const [polygonData, setPolygonData] = useState([]);
 

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBt4syi8lqaQnExCqRbZfDBAkqoLG_D31g"
  })

  const [map, setMap] = useState(null);

  const center = {
    lat: 29.3333300,
    lng: -110.6666700
  };

  var mapOptions = {
    zoom: 7,
    center: center
  };
  
  const onLoad = useCallback((map) => {  
    const bounds = new window.google.maps.Map(document.getElementById('mapa'),mapOptions);
    //map.fitBounds(bounds);

    // Polygon Coordinates
    const triangleCoords = coordenadas.map( (puntos) => 
      //console.log(puntos, index)
      new google.maps.LatLng(puntos[0], puntos[1]),
    );

    //console.log(triangleCoords);

    /* const triangleCoords = [
    new google.maps.LatLng(29.37081,-111.30189),
    new google.maps.LatLng(29.17015,-111.35099),
    new google.maps.LatLng(29.20282,-110.95376)
  ]; */

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

    //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
    //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
    google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
   
    //Display Coordinates below map
     function getPolygonCoords() {
      console.log("polygonCords");
      const len = myPolygon.getPath().getLength(); //3
      //console.log(myPolygon.getPath().getAt(0).toUrlValue(5));
      const newArr = [];
      for (let i = 0; i < len; i++) {
       //setPolygonData([...polygonData, [myPolygon.getPath().getAt(i).toUrlValue(5)] ]);
       newArr.push(myPolygon.getPath().getAt(i).toUrlValue(5));
      }
      setPolygonData(newArr);
    }
  }, [])

  console.log(polygonData);
  onSetGeom(polygonData);

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