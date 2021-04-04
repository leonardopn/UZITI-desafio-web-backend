import getConnection from "../config/dbConfig.js";

export function getProducts() {
    return new Promise((resolve, reject) => {
        getConnection().then(resp => {
            let conn = resp.payload;
            conn.query("SELECT * FROM products").then(result => {
                result = result.filter(user => {
                    return !Array.isArray(user);
                });
                resolve({ status: "OK", payload: result });
            }).catch(err => {
                reject({ status: "ERRO", payload: err });
            }).finally(() => {
                conn.release();
                conn = null;
            });
        }).catch(err => {
            reject({ status: "ERRO", payload: err });
        });
    });
}

export function updateProduct(data) {
    return new Promise((resolve, reject) => {
        getConnection().then(resp => {
            const conn = resp.payload;
            conn.query("UPDATE products SET title=?, unit=?, description=?, recycle=?, price=?, promotion=? WHERE id=?", [data.title, data. unit, data. description, data.recycle, data.price, data.promotion, data.id])
            .then(result => {
                resolve({ status: "OK", payload: result });
            }).catch(err => {
                reject({ status: "ERRO", payload: err });
            }).finally(() => {
                conn.release();
            });
        }).catch(err => {
            reject({ status: "ERRO", payload: err });
        });
    });
}