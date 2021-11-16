import { AnuncioAuto } from "./anuncioAuto.js";
import { crearListadoIndex } from "./indexListado.js";

const $divTablaIndex = document.getElementById("divTablaIndex");
const anuncios =  JSON.parse(localStorage.getItem('anuncios')) || [] ; //para crearlo si no existe.
inyectarListadoIndex();

function inyectarListadoIndex()
{
    console.log("llegó a inyectarListadoIndex");
    if(anuncios.length > 0)
    {
        $divTablaIndex.appendChild(crearListadoIndex(anuncios));
    }
    else
    {
        $divTablaIndex.innerHTML = "<p>No hay autos disponibles</p>"
    }
    
}

