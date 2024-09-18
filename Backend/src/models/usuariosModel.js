// Primer paso, impotar las dependencias que vamos a usar, schema y model que vienen de mongoose
import{Schema, model} from 'mongoose';

const esquemaUsuario = new Schema({
    nombre:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
});

export default model('Usuario', esquemaUsuario);
