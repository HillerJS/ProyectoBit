import { Router } from "express";
import ControladorLogin from "../controller/loginController.js";

const enrutadorDeLogin = Router();
enrutadorDeLogin.post('/',ControladorLogin.login);
enrutadorDeLogin.get('/:token',ControladorLogin.validarToken);

export default enrutadorDeLogin;