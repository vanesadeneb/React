import { useState } from "react"

export const NuevoPoligono = ({ onNewField, muestraFormulario, onSetPolygon, arrGeom }) => {
    console.log(arrGeom);
    const [nombre, setNombre] = useState("");
    const [area, setArea] = useState("");
    const [geom, setGeom] = useState(() => arrGeom.toString());

    const onNameChange = (event) => {
        setNombre(event.target.value);
    }

    const onAreaChange = (event) => {
        setArea(event.target.value);
    }

    const onGeomChange = (event) => {
        //console.log(document.getElementById("coordenadas").value);
        setGeom(event.target.value);
    }
    
    const onSubmit = event => {
        event.preventDefault();
        console.log(event.target);
        console.log("clic");
        console.log(nombre, area, geom);
        if( nombre.trim().length === 0 || area.trim().length === 0 || geom.trim().length === 0) return;
        console.log("otro clic");
        
        onNewField({nombre: nombre, area: area, geom: geom});
        muestraFormulario(false);
        onSetPolygon(geom);
        //etGeom(document.getElementById("coordenadas").value);
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
                placeholder="Ubicación Geográfica"
                onChange={ onGeomChange }
                value={ geom }
            ></textarea>
            <button id="guardar">Guardar</button>
        </form>
    );
}