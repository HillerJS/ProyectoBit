import bcrypt from 'bcryptjs';
import usuariosModel from '../models/usuariosModel.js';

const controladorUsuarios = {
    crearUsuario: async(solicitud, respuesta) =>{
        try{
            const{nombre,email,password} = solicitud.body;
            const contrasenaProtegida = await bcrypt.hash(password,10);
            const nuevoUsuario = new usuariosModel({
                nombre,
                email,
                password: contrasenaProtegida,
            });
            const usuarioCreado = await nuevoUsuario.save();
            if(usuarioCreado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Usuario creado',
                    datos:usuarioCreado._id,
                });
            }
        }catch(error){
            console.log(respuesta)
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al crear usuario',
                    datos:error,
                });
        }
    },
    leerUsuario: async(solicitud, respuesta) =>{
        try{
            const usuarioEncontrado = await usuariosModel.findById(solicitud.params.id);// busqueme con ese id
            if(usuarioEncontrado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Usuario leido',
                    datos:usuarioEncontrado,
                });
            }
        }catch(error){
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al leer usuario',
                    datos:error,
                });
        }
    },
    leerUsuarios: async(solicitud, respuesta) =>{
        try{
            const todosLosUsuarios = await usuariosModel.find();
                console.log(respuesta)
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Usuarios leidos',
                    datos:todosLosUsuarios,
                });
        }catch(error){
            console.log(respuesta)
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al leer los usuarios',
                    datos:error,
                });
        }
    },
    actualizarUsuario: async(solicitud, respuesta) => {
        try{
            const usuarioActualizado = await usuariosModel.findByIdAndUpdate(solicitud.params.id,solicitud.body);
            if(usuarioActualizado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Usuario actualizado',
                    datos:usuarioActualizado._id,
                });
            }
        }catch(error){
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al actualizar el usuario',
                    datos:error,
                });
        }
    },
    eliminarUsuario: async(solicitud, respuesta) => {
        try{
            const usuarioEliminado = await usuariosModel.findByIdAndDelete(solicitud.params.id);
            if(usuarioEliminado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Usuario Eliminado',
                    datos:null,
                });
            }
        }catch(error){
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al eliminar el usuario',
                    datos:error,
                });
        }
    },
};


export default controladorUsuarios;