import { useState } from "react";
import { Poligono } from './componentes/Poligono';
import { Mapa } from './componentes/Mapa';
import { DibujaPoligono } from "./componentes/DibujaPoligono";
import { useEffect } from "react";

export const LotesApp = () => {
    const [arrGeom, setArrGeom] = useState("");
    const [showPolygon, setShowPolygon] = useState(false);
    const [poligonos, setPoligonos] = useState([]);

    const muestraMapa = (value) => {
        setShowPolygon(value);   
    }
    
    const onSetGeom = (arrPolygons) => {
        setArrGeom(arrPolygons);
    }

    useEffect( () => {

    }, [showPolygon]);
    
    return(
        <>
            <Poligono 
                muestraMapa={(value)=>{muestraMapa(value)}} 
                arrGeom={ arrGeom } 
                onSetPolygon={(value) => {onSetPolygon(value)}} 
                poligonos={ poligonos } 
                setPoligonos={ setPoligonos }
            />

            {
                showPolygon ? 
                    <DibujaPoligono poligonos={ poligonos }/> 
                    : <Mapa onSetGeom={( value ) => onSetGeom( value )}/>
            }
        </>
    );
}