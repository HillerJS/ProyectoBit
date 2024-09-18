import "dotenv/config";
import "./conexionDB.js"
import servidor from "./servidor.js";
servidor.listen(3001,()=>{
    console.log("El servidor se esta escuchando en el link http://localhost:3001")
});