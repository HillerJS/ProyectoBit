import { Schema, model } from "mongoose";

const esquemaProducto = new Schema({
    nombre:{type:String, require:true},
    color:{type:String, require:true},
    talla:{type:String, require:true},
    precio:{type:Number, require:true},
    disponibilidad:{type:Number, require:true},
    descripcion:{type:String, require:true},
    imagen:{type:String, require:true},
});

export default model ('Producto', esquemaProducto);
