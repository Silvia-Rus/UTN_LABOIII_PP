//import { anunciosLista } from "./anunciosStorage.js"; //va entre llaves porque hay que desestructuralo.
import { crearTablaBackend} from "./backendTabla2.js";
import { AnuncioAuto } from "./anuncioAuto.js";

const $divTablaBackend = document.getElementById("divTablaBackend"); 
const $divAlert = document.getElementById("divAlert");
const anuncios =  JSON.parse(localStorage.getItem('anuncios')) || [] ; 
actualizarTabla(); 
const $formulario = document.forms[0]; 


window.addEventListener("click", (e)=>{    

    if(e.target.matches("td"))
    {
        const id = e.target.parentElement.id; 
        const anuncioElegido = anuncios.find((anuncio)=> anuncio.id == id);

        cargarFormulario(anuncioElegido);
    }
    else if(e.target.matches("#eliminar")){

        handlerDelete(parseInt($formulario.txtId.value));
    }
    else if(e.target.matches("#cancelar")){

        $formulario.reset();
    }

})

function cargarFormulario(anuncio)
{
    const {txtId, txtTitulo, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia, chkVenta, chkAlquiler} = $formulario;
    
    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    nmbrPrecio.value = anuncio.precio;
    nmbrPuertas.value = anuncio.nroPuertas;
    nmbrKms.value = anuncio.km;
    nmbrPotencia.value = anuncio.potencia; 
    chkVenta.checked = anuncio.venta;
    chkAlquiler.checked = anuncio.alquiler;

    cambioBotonesModificarEliminar();

}

function cambioBotonesModificarEliminar()
{

    //cambio el texto del botón enviar
    const botonEnviar = document.getElementById("enviar");
    botonEnviar.value = "\uf0c7 Modificar";

    //muestro el botón eliminar
    const botonEliminar = document.getElementById("eliminar");
    botonEliminar.hidden = false;

    //cambio el texto del título
    const tituloCRUD = document.getElementById("tituloCRUD");
    tituloCRUD.innerHTML = "<h2>Modificar</h2>";
}

function cambioBotonesAlta()
{
      
     //cambio el texto del botón enviar
     const botonEnviar = document.getElementById("enviar");
     botonEnviar.value = "\uf0c7 Guardar";
 
     //muestro el botón eliminar
     const botonEliminar = document.getElementById("eliminar");
     botonEliminar.hidden = true;
 
     //cambio el texto del título
     const tituloCRUD = document.getElementById("tituloCRUD");
     tituloCRUD.innerHTML = "<h2>Alta Producto</h2>";
     
}

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
   

    const {txtId, txtTitulo, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia, chkVenta, chkAlquiler} = $formulario;


    const formAnuncio = new AnuncioAuto(txtId.value, txtTitulo.value, nmbrPrecio.value, txtDescripcion.value, nmbrPuertas.value, nmbrKms.value, nmbrPotencia.value, chkVenta.checked, chkAlquiler.checked)
   
    console.log("ELQUE VIENE EN EL FORM: "+txtId);
    console.log("ELQUE  tiene el objeto: "+formAnuncio.id);

    //if(formAnuncio.id === ''){ 
    if(txtId.value === ''){ 
       
        formAnuncio.id = Date.now();
        handlerCreate(formAnuncio);

    }
    else{ 
        
        handlerUpdate(formAnuncio);

    }

});
//ALTA
const handlerCreate = (nuevaPropiedad) =>{

    //console.log("llegué a crear");
    anuncios.push(nuevaPropiedad);
    actualizarStorage(anuncios);
    actualizarTabla();
    alerta("ALTA EXITOSA");
    $formulario.reset();

};

//BAJA
const handlerDelete = (id) => {

    //console.log("llegó al delete");

    if(confirm("¿Desea eliminar? \n Esta operación es irreversible"))
    {
        let indice = anuncios.findIndex((element) =>{
            return element.id == id;
        });
    
       anuncios.splice(indice, 1);
       
       actualizarStorage(anuncios);
       actualizarTabla();

    
       $formulario.reset();
       $formulario.txtId.value = '';
       cambioBotonesAlta();

       alerta("ELEMENTO BORRADO");
    }

    console.log(anuncios);
 
};

//MODIFICACIÓN
const handlerUpdate = (anuncioAEditar) =>{
    

    if(confirm("¿Desea modificar?"))
    {
        const anuncio = anuncios.find((element)=> element.id == anuncioAEditar.id);

        //const anuncio = anunciosLista.find((element)=> element.id == propiedadEditada.id);
        const {txtId, txtTitulo, txtDescripcion, nmbrPrecio, nmbrPuertas, nmbrKms, nmbrPotencia, chkVenta, chkAlquiler} = $formulario;
    
        anuncio.titulo = txtTitulo.value;
        anuncio.descripcion = txtDescripcion.value;
        anuncio.precio = nmbrPrecio.value;
        anuncio.nroPuertas = nmbrPuertas.value;
        anuncio.km = nmbrKms.value;
        anuncio.potencia = nmbrPotencia.value;
        anuncio.venta = chkVenta.checked;
        anuncio.alquiler = chkAlquiler.checked;
    
    
        actualizarStorage(anuncios);
        actualizarTabla();  
        $formulario.reset();  
    
        cambioBotonesAlta()

        alerta("MODIFICACIÓN EXITOSA");
    }

}


//REFRESCAR MEMORIA Y TABLAS
const actualizarStorage = (data)=>{
    localStorage.setItem("anuncios", JSON.stringify(data));
}

function borrarTabla(){
    while($divTablaBackend.hasChildNodes())
    {
        $divTablaBackend.removeChild($divTablaBackend.firstElementChild);
    }

}

function actualizarTabla() {

    borrarTabla();
    $divTablaBackend.appendChild(crearSpinner());

    setTimeout(() => {

        borrarTabla();
        //actualizo el storage
        const data = JSON.parse(localStorage.getItem("anuncios"));

        if(data.length ==0)
        {

            const p = document.createElement("p");
            const contenido = document.createTextNode("Sin registros por ahora.");
            p.appendChild(contenido);
            $divTablaBackend.appendChild(p);

        }
        else{
            $divTablaBackend.appendChild(crearTablaBackend(data));
        }
        
    }, 2000);

}

//SPINNER
function crearSpinner() {
    const spinner = document.createElement("img");
  
    spinner.className = "spinner";
    
    spinner.src = "./assets/spinner.gif";
    spinner.alt = "Progressbar";
  
    return spinner;
};

//ALERTAS

function alerta ( texto ) {

   //alert(texto);

    $divAlert.innerHTML="<div id='textoAlerta'>"+texto+"</div>";
    
    setTimeout(()=>{
        $divAlert.innerHTML="";
    }, 2000);
    
  }





