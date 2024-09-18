import { Router } from "express";
import controladorProductos from "../controller/productosController.js";

const enrutadorDeProductos = Router();

enrutadorDeProductos.post('/',controladorProductos.crearProducto);
enrutadorDeProductos.get('/:id',controladorProductos.leerProducto);
enrutadorDeProductos.get('/',controladorProductos.leerProductos);
enrutadorDeProductos.put('/:id',controladorProductos.actualizarProducto);
enrutadorDeProductos.delete('/:id',controladorProductos.eliminarProducto);

export default enrutadorDeProductos;