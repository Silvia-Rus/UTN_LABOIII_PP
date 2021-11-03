//import { anunciosLista } from "./anunciosStorage.js"; //va entre llaves porque hay que desestructuralo.
import { crearTablaBackend, crearTablaIndex } from "./dinamicas.js";
import { AnuncioAuto } from "./anuncioAuto.js";

const $divTablaBackend = document.getElementById("divTabla"); //empieza por pesos porque es una referencia a la UY
const $divTablaIndex = document.getElementById("divTablaIndex");
const anuncios =  JSON.parse(localStorage.getItem('anuncios')) || [] ; //para crearlo si no existe.
actualizarTabla(); 
InyectarTablaIndex();
const $formulario = document.forms[0]; //solo tengo uno


window.addEventListener("click", (e)=>{    //le delego a la ventana el evento click

    if(e.target.matches("td"))//si clicko en una celda //así puedo manejar todas las celdas
    {
        const id = e.target.parentElement.id; 
        const anuncioElegido = anuncios.find((anuncio)=> anuncio.id == id);

        cargarFormulario(anuncioElegido);
    }
    else if(e.target.matches("#eliminar")){

        handlerDelete(parseInt($formulario.txtId.value));
    }

})

function cargarFormulario(anuncio)
{

    const {txtId, txtTitulo, rdoOperacion, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia} = $formulario;
    
    //paso los valores al formulario
    txtId.value = anuncioAuto.id;
    txtTitulo.value = anuncioAuto.titulo;
    rdoOperacion.value = anuncioAuto.transaccion;
    txtDescripcion.value = anuncio.descripcion;
    nmbrPrecio.value = anuncioAuto.precio;
    nmbrPuertas.value = anuncioAuto.nroPuertas;
    nmbrKms.value = anuncioAuto.nmbrKms;
    nmbrPotencia.value = anuncioAuto.potencia;

    //cambio el texto del botón enviar
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.value = "Modificar";

    //muestro el botón eliminar
    const botonEliminar = document.getElementById("eliminar");
    botonEliminar.hidden = false;

    //cambio el texto del título
    const tituloCRUD = document.getElementById("tituloCRUD");
    tituloCRUD.textContent = "Modificar";

}

function cambioBotonesAlta()
{
      
     //cambio el texto del botón enviar
     const botonEnviar = document.getElementById("enviar");
     botonEnviar.value = "Guardar";
 
     //muestro el botón eliminar
     const botonEliminar = document.getElementById("eliminar");
     botonEliminar.hidden = true;
 
     //cambio el texto del título
     const tituloCRUD = document.getElementById("tituloCRUD");
     tituloCRUD.textContent = "Alta Producto";
     
}

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();//abortamos el comportamiento por defecto

    //cuando llego aquí alguien ha tocado el botón

    const {txtId, txtTitulo, rdoOperacion, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia} = $formulario;
    //leo los valores de los controles

    const formAnuncio = new AnuncioAuto(txtId.value, txtTitulo.value, rdoOperacion.value, nmbrPrecio.value, txtDescripcion.value, nmbrPuertas.value, nmbrKms.value, nmbrPotencia.value)
   
    //if(formAnuncio.id === ''){ 
    if(txtId.value === ''){  //alta porque no tiene id
       
        formAnuncio.id = Date.now();
        //console.log(formAnuncio);
        handlerCreate(formAnuncio);

    }
    else{ //update porque tengo un id
        
        handlerUpdate(formAnuncio);

    }

});
//ALTA
const handlerCreate = (nuevaPropiedad) =>{

    anuncios.push(nuevaPropiedad);
    actualizarStorage(anuncios);
    actualizarTabla();
    $formulario.reset();

}

const handlerDelete = (id) => {

    console.log("llegó al delete");

    let indice = anuncios.findIndex((element) =>{
        return element.id == id;
   });

   anuncios.splice(indice, 1);
   
   actualizarStorage(anuncios);
   actualizarTabla();

   $formulario.reset();
   cambioBotonesAlta();
};

//BAJA
const handlerUpdate = (propiedadEditada) =>{
    
    const anuncio = anuncios.find((element)=> element.id == propiedadEditada.id);

    //const anuncio = anunciosLista.find((element)=> element.id == propiedadEditada.id);
    const {txtTitulo, rdoOperacion, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia} = $formulario;

    anuncioAuto.titulo = txtTitulo.value;
    anuncioAuto.transaccion = rdoOperacion.value;
    anuncioAuto.descripcion = txtDescripcion.value;
    anuncioAuto.precio = nmbrPrecio.value;
    anuncioAuto.nroPuertas = nmbrPuertas.value;
    anuncioAuto.kms = nmbrKms.value;
    anuncioAuto.potencia = nmbrPotencia.value;


    actualizarStorage(anuncios);
    actualizarTabla();  
    $formulario.reset();  

    cambioBotonesAlta()

}


const actualizarStorage = (data)=>{
    localStorage.setItem("anuncios", JSON.stringify(data));
}




function actualizarTabla() {

    $divTablaBackend.appendChild(crearSpinner());

    setTimeout(() => {
        //actualizo la tabla
        while($divTablaBackend.hasChildNodes())
        {
            $divTablaBackend.removeChild($divTablaBackend.firstElementChild);
        }
        //actualizo el storage
        const data = JSON.parse(localStorage.getItem("anuncios"));

        if(data){
            $divTablaBackend.appendChild(crearTablaBackend(data));
        }
        }, 2000);

}

function crearSpinner() {
    const spinner = document.createElement("img");
  
    spinner.width = 300;
    
    spinner.src = "./assets/spinner.gif";
    spinner.alt = "Progressbar";
  
    return spinner;
};

function InyectarTablaIndex()
{
    console.log("llego a inyectar");
    const data = JSON.parse(localStorage.getItem("anuncios"));
    $divTablaIndex.appendChild(crearTablaIndex(data));
}







