import multer from 'multer';//middleware encarga de gestionar el envio de formulario que contienen archivos
import productosModel from "../models/productosModel.js";
import { response } from 'express';

const controladorProductos = {
    crearProducto: async(solicitud, respuesta) =>{//Asincronico valida o carga la informacion de forma paralela mientras valida la información
        try{
            const imagenesProductos = multer.diskStorage({
                destination:'imagenes',
                filename:(req,file,cb) => {// reciba el archivo y este tenga un tipo un  nombre
                    cb(null,file.originalname);
                },
            });
            const carga = multer({
                storage:imagenesProductos // almacena los archivos directamente en el sistema de archivos de mi servidor
            }).single('imagen'); // single se escribe para especificar que se espera solo una imagen 
            carga(solicitud,respuesta,async(error) => {
                if(error){
                    response.json({
                        resultado:'Ups',
                        mensaje:'Error al cargar imagen del producto',
                        datos:null, // null es que no va almacenar nada
                    });
                } else{
                    const nuevoProducto = productosModel({
                        nombre:solicitud.body.nombre,
                        color:solicitud.body.color,
                        talla:solicitud.body.talla,
                        precio:solicitud.body.precio,
                        disponibilidad:solicitud.body.disponibilidad,
                        descripcion:solicitud.body.descripcion,
                        imagen:solicitud.file.filename,
                    });
                    const productoCreado = await nuevoProducto.save();//dentro de esa constante yo voy a esperar que se guarden esos datos
                    if(productoCreado._id){// si estos datos se crearon y le generó un _id
                        respuesta.json({
                            resultado:'Bien',
                            mensaje:'Producto creado',
                            datos:productoCreado._id,
                        });
                    }
                }
            });
        }catch(error){
            respuesta.json({
                resultado:'Ups',
                mensaje:'Error al crear producto',
                datos:error,
            });
        }
    },
    leerProducto: async(solicitud,respuesta) => {
        try{
            const productoEncontrado = await productosModel.findById(solicitud.params.id);// esperar a obtener esos datos 
            if(productoEncontrado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Producto leido',
                    datos:productoEncontrado,
                });
            }
        }catch(error){
            respuesta.json({
                resultado:'Ups',
                mensaje:'Error al leer producto',
                datos:error,
            });
    }
    },
    leerProductos: async(solicitud, respuesta) =>{
        try{
            const todosLosProductos = await productosModel.find();
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Productos leidos',
                    datos:todosLosProductos,
                });
        }catch(error){
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al leer los Productos',
                    datos:error,
                });
        }
    },
    actualizarProducto: async(solicitud, respuesta) => {
        try {
            const productoActualizado = await productosModel.findByIdAndUpdate(solicitud.params.id,solicitud.body);
            if(productoActualizado._id){
                
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'producto actualizado',
                    datos:productoActualizado._id,
                });
            }
        }catch(error){
            
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al actualizar el producto',
                    datos:error,
            });
        }
    },
    eliminarProducto: async(solicitud, respuesta) => {
        try{
            const productoEliminado = await productosModel.findByIdAndDelete(solicitud.params.id);
            if(productoEliminado._id){
                respuesta.json({
                    resultado:'Bien',
                    mensaje:'Producto Eliminado',
                    datos:null,
                });
            }
        }catch(error){
                respuesta.json({
                    resultado:'Ups',
                    mensaje:'Error al eliminar el producto',
                    datos:error,
                });
        }
    },
};

export default controladorProductos;