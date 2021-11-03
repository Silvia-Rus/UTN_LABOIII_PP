import Anuncio from "./anuncio.js";

export class AnuncioAuto extends Anuncio {
    constructor(id, titulo, transaccion,  precio, descripcion, nroPuertas, km, potencia){
        super(id, titulo, transaccion, precio, descripcion);
        this.nroPuertas = nroPuertas;
        this.km = km;
        this.potencia = potencia;
    }
}