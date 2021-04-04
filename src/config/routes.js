import { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {getProducts, updateProduct} from "../dataBase/querys.js";

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

router.post("/updateProduct", (req, res) => {
    if(req.body){
        updateProduct(req.body).then(result=>{
            res.send(result.payload);
        }).catch(err =>{
            console.log(err);
            res.status(503).send(err.payload);
        })
    }
});

export default router;