import mongoose from "mongoose";
mongoose
.connect(process.env.BASEMONGO)
.then((dato) => {
    console.log("Bien, ahora estás conectado a la BD");
}).catch((error) => {
    console.log("Ups, no estás conectado a la BD");
});