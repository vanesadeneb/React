const getImagen = async () => {

    try {
        const apiKey = 'foegsH4xBMn97C2uQZhAb2u43DGbsUkX';
        const resp = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${ apiKey } `);
        const {data} = await resp.json();

        const {url} = data.images.original;
        console.log(url);
        
        const img  = document.createElement('img');
        img.src = url;

        document.body.append(img);
    } catch (error) {
        //manejo del error
        console.error(error);
    }
    
}

getImagen();