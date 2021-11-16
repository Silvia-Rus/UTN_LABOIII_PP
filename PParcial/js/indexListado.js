export const crearListadoIndex = (data) =>{

    const parrafo = document.createElement("p"); 

    data.forEach(element => {

        const abrirDiv = "<div id='card'>";
        const titulo = "<h2><p>"+element.titulo+"</p></h2>";
        const descripcion = "<p>"+element.descripcion+"</p>";
        const precio = "<p>Precio: $"+element.precio+"</p>";
        const puertas = "<p>Puertas: "+element.nroPuertas+"</p>";
        const km = "<p>Km: "+element.km+"</p>";
        const potencia = "<p>Potencia: "+element.potencia+"</p>";
        const barra = "<p>---------------------------------------------</p>"
        const verVehiculo = "<p><a href='#'>VER VEHÍCULO</a></p>";
        const cerrarDiv = "</div>";

        parrafo.innerHTML += abrirDiv+titulo+descripcion+precio+puertas+km+potencia+barra+verVehiculo+cerrarDiv;

    });

    console.log(parrafo);
    return parrafo;

}

