import { useState } from "react";
import { Poligono } from './componentes/Poligono';
import { Mapa } from './componentes/Mapa';
import { DibujaPoligono } from "./componentes/DibujaPoligono";
import { useEffect } from "react";

export const LotesApp = () => {
    const [arrGeom, setArrGeom] = useState("");
    const [showPolygon, setShowPolygon] = useState(false);
    
    const muestraMapa = (value) => {
        setShowPolygon(value);   
    }
    
    const onSetGeom = (arrPolygons) => {
        setArrGeom(arrPolygons);
    }

    useEffect( () => {

    }, [showPolygon]);
    console.log(showPolygon);
    return(
        <>
            <Poligono muestraMapa={(value)=>{muestraMapa(value)}} arrGeom={ arrGeom }/>
            {
                showPolygon ? 
                    <DibujaPoligono /> 
                    : <Mapa onSetGeom={( value ) => onSetGeom( value )}/>
            }
        </>
    );
}