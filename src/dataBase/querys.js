import getConnection from "../config/dbConfig.js";

export function getProducts() {
    return new Promise((resolve, reject) => {
        getConnection().then(resp => {
            const conn = resp.payload;
            conn.query("SELECT * FROM products").then(result => {
                result = result.filter(user => {
                    return !Array.isArray(user);
                });
                resolve({ status: "OK", payload: result });
            }).catch(err => {
                reject({ status: "ERRO", payload: err });
            }).finally(() => {
                conn.end();
            });
        }).catch(err => {
            reject({ status: "ERRO", payload: err });
        });
    });
}