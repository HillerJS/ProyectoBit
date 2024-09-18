
import bcrypt from 'bcryptjs';
import { generarToken, verificarToken } from '../funciones/funciones.js';
import usuariosModel from '../models/usuariosModel.js';

const ControladorLogin = {
    login:async(solicitud,respuesta) => {
        try{
            const {username,contrasenaPassword} = solicitud.body;
            const usuarioEncontrado = await usuariosModel.findOne({
                email:username,
            });
            const contrasenaValidada = await bcrypt.compare(
                contrasenaPassword,
                usuarioEncontrado.password
            );
            if(contrasenaValidada){
                const token = await generarToken({
                    id:usuarioEncontrado._id,
                    name:usuarioEncontrado.nombre,
                });
                respuesta.json({
                    resultado: 'Bien',
                    mensaje: 'Acceso permitido',
                    datos: token,
                });
            }else{
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Acceso denegado',
                    datos:null,
                });
            }
        }
        catch(error){
            respuesta.json({
                resultado:'Ups',
                mensaje:'Ocurrio un error al iniciar sesión',
                datos:error,
            });
        }
    },
    validarToken: async(solicitud, respuesta) => {
        try{
            const token = solicitud.params.token;
            const decodificado = await verificarToken(token);
            if(decodificado.id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Token valido',
                    datos:decodificado,
                });
            } else{
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Token no válido',
                    datos:null,
                });
            }
        }catch(error){
            respuesta.json({
                resultado:'Ups',
                mensaje:'Ocurrio un error al validar el token',
                datos:error,
            });
        }
    },
};
export default ControladorLogin;
