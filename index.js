import express from 'express';
import router from "./src/config/routes.js";

const server = express();

server.use(router);

server.listen(3542, _ => {
    console.log("Servidor express escutando na porta: 3542");
})