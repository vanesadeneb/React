export const geomFormat = (arrGeom) => {
    const newFormat =  arrGeom.map(element => 
        element.replace(",", " ")
    );
    
    newFormat.push(newFormat[0]);

    return newFormat;
}