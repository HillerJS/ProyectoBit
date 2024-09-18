import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import enrutadorDeUsuarios from "./routers/usuariosRouters.js";
import enrutadorDeProductos from "./routers/productosRouters.js";
import enrutadorDeLogin from "./routers/loginRouters.js";


const servidor = express();
servidor.use(cors());
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use('/usuarios',enrutadorDeUsuarios);
servidor.use('/productos',enrutadorDeProductos);
servidor.use('/login',enrutadorDeLogin);
servidor.use('/imagenes',express.static(path.resolve(`imagenes`)));

servidor.get('/',(solicitud, respuesta) => {
    respuesta.status(404).send("Ups Página no encontrada!!");
})
export default servidor;


