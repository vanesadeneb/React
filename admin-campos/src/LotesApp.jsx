import { useState } from "react";
import { Poligono } from './componentes/Poligono';
import { Mapa } from './componentes/Mapa';
import { DibujaPoligono } from "./componentes/DibujaPoligono";

export const LotesApp = () => {
    const [latLng, setlatLng] = useState("");
    const [arrGeom, setArrGeom] = useState("");
    const [showPolygon, setShowPolygon] = useState(false);
    
    const muestraMapa = (value) => {
        setShowPolygon(value);   
    }

    const onSetPolygon = (points) => {
      setlatLng(points);
    }

    const onSetGeom = (arrPolygons) => {
        setArrGeom(arrPolygons);
    }
    
    return(
        <>
            <Poligono onSetPolygon={(value)=> onSetPolygon(value)} muestraMapa={(value)=>{muestraMapa(value)}} arrGeom={ arrGeom }/>
            {showPolygon ? <DibujaPoligono /> : <Mapa onSetGeom={( value ) => onSetGeom( value )}/>}
        </>
    );
}