
export const crearTablaBackend = (data) =>{ //esto devuelve una tabla completa. esa tabla la cuelgo en el div. 

    //crear una tabla
    const tabla = document.createElement("table");//aquí creamos lo que vamos a retornar
    //crear un thead --> un tr. recorrer un objeto del array y analizar las keys para cargar los th.
    const thead = document.createElement("thead");
    //tbody ---> recorrer el array para crear una fila por cara de registro.
    const tbody = document.createElement("tbody");

    //LA CABECERA
    const cabecera = document.createElement("tr"); //genero la row

  
    //ESTA MANERA SÍ ANDA
    for (const key in data[0]) { //recorrer las llaves de un objeto. agarramos el primero objeto de un arrat y vemos sus llaves
       
        if(key != "id"){ //no queremos que se muestre el id
            //ESTO ANDA
            const th = document.createElement("th");//creo la celda
            //manera larga - mediante método   
            const contenido = document.createTextNode(key); //creo nodo de texto cuyo contenido es el nombre de la key
            th.appendChild(contenido); //le meto el texto a la celda.
            cabecera.appendChild(th);//le añado el th con todo ya puesto.
        }
    }

    //GENERO EL TBODY -- DOS MANERAS - ANDAN LAS DOS

    /*for (const value of data) {

        const tr = document.createElement("tr"); //por cada elemento genero una row
        //console.log(value);

        for (const key in value) {

            console.log(value[key]);
            if(key === "id"){
                tr.setAttribute("id", key);
            }
            else{//le meto los datos a la row
                const td = document.createElement("td");//creo la celda
                //manera larga - mediante método
                const contenido = document.createTextNode(value[key]); //creo nodo de texto cuyo contenido es el nombre de la key
                td.appendChild(contenido); //le meto el texto a la celda.
                cabecera.appendChild(td);//le añado el th con todo ya puesto.
                tr.appendChild(td);
            
            }

        }
      
        tbody.appendChild(tr);
        
    }*/
    data.forEach(element => {
        const tr = document.createElement("tr"); //por cada elemento genero una row

        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("id", element[key]);
            }
            else{//le meto los datos a la row
            const td = document.createElement("td");
            td.textContent = element[key];
            tr.appendChild(td);
            }

        }
        tbody.appendChild(tr);
    });

    thead.appendChild(cabecera); //le añadimos la cabecera al thead
    tabla.appendChild(thead); //le añadimos el thead a la tabla
    tabla.appendChild(tbody); //le añadimos el tbody a la tabla

    return tabla;


}

export const crearTablaIndex = (data) =>{


    const parrafo = document.createElement("p"); 

    var saltoDeLinea = document.createElement("br");
    data.forEach(element => {

        console.log("entra aquí");

        parrafo.innerHTML += "<p>"+element.titulo+"</p><p>"+element.precio+"</p><p>"+element.nroPuertas+"</p><p>"+element.km+"</p><p>"+element.potencia+"</p>------------------------------------------";

    });

    console.log(parrafo);
    return parrafo;


}

