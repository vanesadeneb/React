import React from "react";
import { useEffect, useState } from "react";
import { DibujaPoligono } from "./DibujaPoligono";
import { NuevoPoligono } from "./NuevoPoligono";

export const Poligono = ({muestraMapa, arrGeom}) => {
    
    const [poligono, setPoligono] = useState([]);
    const [nuevo, setNuevo] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:3000/lotes")
        .then(response => response.json())
        .then(lotes => setPoligono(lotes));
    },[]);

    const onSetPolygon = (onNewField, deleted=false) => {
        console.log("onSetPolygon");
        if(!deleted){
            setPoligono([onNewField, ...poligono]);

        }else{
            const filtrarLote = poligono.filter(
                (element) => element.id !== onNewField.id
            );
            console.log("filtrar lote", filtrarLote);
            setPoligono(filtrarLote);
        }
        
    }

    const muestraFormulario = (value) => {
        setNuevo(value);
    }

    const eliminar = (id) =>{
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        };

        fetch('http://localhost:3000/lotes/'+ id, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("after delete");
            onSetPolygon({id}, true);
        });
        
    }

    console.log("poligono value:",poligono);
    return (
        <aside>
            <button onClick={ muestraFormulario }><i className="fa-solid fa-circle-plus"></i>Nuevo Lote</button>
            
            {nuevo && <NuevoPoligono 
                        muestraFormulario={ (value) => muestraFormulario(value) } 
                        onSetPolygon={(value)=> onSetPolygon(value)} 
                        arrGeom={ arrGeom }
    />}
            
            <ul id="lista de poligonos">
                { poligono.map( campo => {
                    return <li key={campo.id} onClick={() => muestraMapa(true)}>
                                <i className="fa-solid fa-location-dot"></i> 
                                <span>
                                    <p id="nombre">{ campo.name }</p>
                                    <p id="area">{ campo.area }</p>
                                </span>
                                <button id="delete-button" onClick={ () => eliminar(campo.id) }>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </li>
                }) }
            </ul>
        </aside>
    );
}