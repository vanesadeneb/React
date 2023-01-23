import { useState,useEffect } from "react"

export const NuevoPoligono = ({ muestraFormulario, onSetPolygon, arrGeom }) => {
    console.log("Nuevo Poligono",arrGeom); 
    const [nombre, setNombre] = useState("");
    const [area, setArea] = useState("");
    const [geom, setGeom] = useState(arrGeom.toString());

    
    const geomFormat = () => {
        const newFormat =  arrGeom.map(element => 
            element.replace(",", " ")
        );
        newFormat.push(newFormat[0]);
        return newFormat;
    }
   
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
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: nombre, area: area, geom: "POLYGON((" + geomFormat() + "))"})
        };

        fetch('http://localhost:3000/lotes', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            onSetPolygon({id: data.id, name: nombre, area: area, geom: geom});
        });
        
        console.log(nombre, area, geom);
        
        if( nombre.trim().length === 0 || area.trim().length === 0 || geom.trim().length === 0) return;
        
        
        
        muestraFormulario(false);
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