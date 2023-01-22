import { useState } from "react";
import { Poligono } from './componentes/Poligono';
import { Mapa } from './componentes/Mapa';

export const LotesApp = () => {
    const [latLng, setlatLng] = useState("");
    const [arrGeom, setArrGeom] = useState(null);
    
    const onSetPolygon = (points) => {
      setlatLng(points);
    }

    const onSetGeom = (arrPolygons) => {
        setArrGeom(arrPolygons);
    }
    console.log(latLng);
    return(
        <>
            <Poligono onSetPolygon={(value)=> onSetPolygon(value)}/>
            <Mapa latLng={latLng}/>
        </>
    );
}