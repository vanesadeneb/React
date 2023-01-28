import React from "react";
import { useEffect, useState } from "react";
import config from "../config";
import { DibujaPoligono } from "./DibujaPoligono";
import { NuevoPoligono } from "./NuevoPoligono";
import Swal from 'sweetalert2';

const apiHost = config.api.host;

export const Poligono = ({poligonos, setPoligonos, muestraMapa, arrGeom}) => {
   
   // const [poligono, setPoligono] = useState([]);
    const [nuevo, setNuevo] = useState(false);
    
     useEffect(() => {
        fetch(`http://${apiHost}/lotes`)
        .then(response => response.json())
        .then(lotes => setPoligonos(lotes));
    },[]); 

     const onSetPolygon = (onNewField, deleted=false) => {

        if(!deleted){
            setPoligonos([onNewField, ...poligonos]);
        }else{
            const filtrarLote = poligonos.filter(
                (element) => element.id !== onNewField.id
            );

            setPoligonos(filtrarLote);
        }
        
    } 

    const muestraFormulario = (value) => {
        setNuevo(value);
    }

     const eliminar = (id) =>{
        Swal.fire({
            title: '¿Desea eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                const requestOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({id: id})
                };
        
                fetch(`http://${apiHost}/lotes/${id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    onSetPolygon({id}, true);
                    muestraMapa(false);
                });
                Swal.fire(
                    'El registro ha sido borrado'
                )
            }
          })
        
    } 

    return (
        <aside>
            <button onClick={ muestraFormulario }><i className="fa-solid fa-circle-plus"></i>Nuevo Lote</button>
            
            {nuevo && <NuevoPoligono 
                        muestraFormulario={ (value) => muestraFormulario(value) } 
                        onSetPolygon={(value)=> onSetPolygon(value)} 
                        arrGeom={ arrGeom }
            />}
            
            <ul id="lista de poligonos">
                { poligonos.map( ({id, name, area}) => {
                    return <li key={id} onClick={() => muestraMapa(true)}>
                                <i className="fa-solid fa-location-dot"></i> 
                                <span>
                                    <p id="nombre">{ name }</p>
                                    <p id="area">{ area }</p>
                                </span>
                                <button id="delete-button" onClick={ () => eliminar(id) }>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </li>
                }) }
            </ul>
        </aside>
    );
}