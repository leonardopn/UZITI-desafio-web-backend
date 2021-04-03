import { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {getProducts} from "../dataBase/querys.js";

const router = Router();

router.use(cors());

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());

router.get("/getProducts", (req, res) => {
    getProducts().then(result=>{
        res.send(result.payload);
    }).catch(err =>{
        res.status(503).send(err.payload);
    })
});

export default router;