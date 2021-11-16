
export const crearTablaBackend = (data) =>{ //esto devuelve una tabla completa. esa tabla la cuelgo en el div. 

    const tabla = document.createElement("table");//aquí creamos lo que vamos a retornar
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const cabecera = document.createElement("tr"); //genero la row

  
    for (const key in data[0]) {
        if(key !== "id"){
            const th = document.createElement("th");
            const contenido = document.createTextNode(key);
            th.appendChild(contenido);
            cabecera.appendChild(th);
            
            switch(key){
                case "titulo":
                    th.textContent = "Título";
                    break;
                case "precio":
                    th.textContent = "Precio";
                    break;
                case "descripcion":
                    th.textContent = "Descripción";
                    break;
                case "nroPuertas":
                    th.textContent = "Nº Puertas";
                    break;
                case "potencia":
                    th.textContent = "Potencia";
                    break;               
                case "km":
                    th.textContent = "Kms";
                    break;
                case "venta":
                    th.textContent = "Venta";
                    break;
                case "alquiler":
                    th.textContent = "Alquiler";
                    break;
                default:
                    th.textContent = key;
                    break;
            }
        }                
    }
    data.forEach(element => {
        const tr = document.createElement("tr"); 

        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("id", element[key]);
            }
            else{

            const td = document.createElement("td");

            switch(element[key])
            {
                case true:
                    td.textContent = "Sí";
                    break;
                case false:
                    td.textContent = "No";
                    break;
                default:
                    td.textContent = element[key];
                    break;
            }
            
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

