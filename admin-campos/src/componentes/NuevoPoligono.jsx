import { useState,useEffect } from "react"
import { geomFormat } from "../helpers/geoFormat";
import Swal from 'sweetalert2';
import config from "../config";

const apiHost = config.api.host;

export const NuevoPoligono = ({ muestraFormulario, onSetPolygon, arrGeom }) => {
   
    const [nombre, setNombre] = useState("");
    const [area, setArea] = useState("");
    const [geom, setGeom] = useState(arrGeom.toString());
   
    useEffect(() => {
        setGeom(arrGeom.toString());
      }, [arrGeom, geom]);
      
    const onNameChange = (event) => {
        setNombre(event.target.value);
    }

    const onAreaChange = (event) => {
        setArea(event.target.value);
    }
    
    const onSubmit = event => {
        event.preventDefault();
        
        if( nombre.trim().length === 0 || area.trim().length === 0 || geom.trim().length === 0) {
            Swal.fire("Favor de llenar todos los campos");
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name: nombre, area: area, geom: "POLYGON((" + geomFormat(arrGeom) + "))"})
            };
    
            fetch(`http://${apiHost}/lotes`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onSetPolygon({id: data.id, name: nombre, area: area, geom: geom});
            });
            
            muestraFormulario(false);
        }
        
    }

    return (
        <form onSubmit={ onSubmit }>
            <input 
                type="text"
                placeholder="Nombre"
                onChange={ onNameChange }
            />
            <input 
                type="text"
                placeholder="Área"
                onChange={ onAreaChange }
            />
            <textarea
                id="coordenadas"
                type="text"
                placeholder="Adapta el triangulo rojo a tu lote en el mapa para guardar coordenadas..."
                value={ geom }
                readOnly
            ></textarea>
            <button id="guardar">Guardar</button>
            
        </form>
    );
}