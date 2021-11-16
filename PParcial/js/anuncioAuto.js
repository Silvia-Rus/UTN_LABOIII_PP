import Anuncio from "./anuncio.js";

export class AnuncioAuto extends Anuncio {
    constructor(id, titulo, precio, descripcion, nroPuertas, km, potencia, venta, alquiler){
        super(id, titulo, precio, descripcion);
        this.nroPuertas = nroPuertas;
        this.km = km;
        this.potencia = potencia;
        this.venta = venta;
        this.alquiler = alquiler;
    }
}