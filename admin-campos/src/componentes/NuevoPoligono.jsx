import { useState } from "react"

export const NuevoPoligono = ({ onNewField, muestraFormulario, onSetPolygon }) => {
    
    const [nombre, setNombre] = useState("");
    const [area, setArea] = useState("");
    const [geom, setGeom] = useState("");

    const onNameChange = (event) => {
        setNombre(event.target.value);
    }

    const onAreaChange = (event) => {
        setArea(event.target.value);
    }

    const onGeomChange = (event) => {
        setGeom(event.target.value);
    }
    
    const onSubmit = event => {
        event.preventDefault();
        if( nombre.trim().length <= 1 || area.trim().length <= 1 || geom.trim().length <= 1) return;
        
        onNewField({nombre: nombre, area: area, geom: geom});
        muestraFormulario(false);
        onSetPolygon(geom);
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
                type="text"
                placeholder="Ubicación Geográfica"
                onChange={ onGeomChange }
            ></textarea>
            <button id="guardar">Guardar</button>
        </form>
    );
}