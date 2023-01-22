import React from "react";
import { useState } from "react";
import { NuevoPoligono } from "./NuevoPoligono";

export const Poligono = ({onSetPolygon}) => {

    const [poligono, setPoligono] = useState([{id:1, nombre: "Predio1", geom: "Meza del Seri - Maleza"}, {id:2, nombre: 'test', area: '345', geom: '29.37081,-111.30189\n29.17015,-111.35099\n29.20282,-110.95376'}]);
    const [nuevo, setNuevo] = useState(false);

    const muestraFormulario = (value) => {
        setNuevo(value);
    }

    const agregarCampo = (onNewField) => {
        setPoligono([onNewField, ...poligono]);
    }

    console.log(poligono);
    return (
        <aside>
            <button onClick={ muestraFormulario }><i className="fa-solid fa-circle-plus"></i>Nuevo Lote</button>
            
            {nuevo && <NuevoPoligono onNewField={( value ) => agregarCampo( value )} muestraFormulario={ (value) => muestraFormulario(value) } onSetPolygon={(value)=> onSetPolygon(value)}/>}
            
            <ul id="lista de poligonos">
                { poligono.map( campo => {
                    return <li key={campo.id} onClick={()=>console.log("crear mapa con poligono")}>
                                <i className="fa-solid fa-location-dot"></i> 
                                <span>
                                    <p id="nombre">{campo.nombre}</p>
                                    <p id="descripcion">{campo.geom}</p>
                                </span>
                                <button id="delete-button">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </li>
                }) }
            </ul>
        </aside>
    );
}