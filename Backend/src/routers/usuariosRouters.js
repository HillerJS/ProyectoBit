import { Router } from "express";
import controladorUsuarios from "../controller/usuariosController.js";

const enrutadorDeUsuarios = Router();

enrutadorDeUsuarios.post('/',controladorUsuarios.crearUsuario);
enrutadorDeUsuarios.get('/:id',controladorUsuarios.leerUsuario);
enrutadorDeUsuarios.get('/',controladorUsuarios.leerUsuarios);
enrutadorDeUsuarios.put('/:id',controladorUsuarios.actualizarUsuario);
enrutadorDeUsuarios.delete('/:id',controladorUsuarios.eliminarUsuario);

export default enrutadorDeUsuarios;