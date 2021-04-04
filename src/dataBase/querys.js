import connDB from "../config/dbConfig.js";

export function getProducts() {
    return new Promise((resolve, reject) => {
        try {
            if (connDB.status === "ERRO") {
                reject({ status: "ERRO", payload: connDB.payload });
            }

            const conn = connDB.payload;

            conn.query("SELECT * FROM products ORDER BY ordination").then(result => {
                result = result.filter(user => {
                    return !Array.isArray(user);
                });
                resolve({ status: "OK", payload: result });
            }).catch(err => {
                reject({ status: "ERRO", payload: err });
            }).finally(() => {
                conn.release();
            });
        }
        catch (err) {
            reject({ status: "ERRO", payload: err });
        }
    });
}

export function updateProduct(data) {
    return new Promise((resolve, reject) => {
        try {
            if (connDB.status === "ERRO") {
                reject({ status: "ERRO", payload: connDB.payload });
            }

            const conn = connDB.payload;

            conn.query("UPDATE products SET title=?, unit=?, description=?, recycle=?, price=?, promotion=? WHERE id=?", [data.title, data.unit, data.description, data.recycle, data.price, data.promotion, data.id])
                .then(result => {
                    resolve({ status: "OK", payload: result });
                }).catch(err => {
                    reject({ status: "ERRO", payload: err });
                }).finally(() => {
                    conn.release();
                });
        }
        catch (err) {
            reject({ status: "ERRO", payload: err });
        }
    });
}

export function updateOrder(data) {
    return new Promise((resolve, reject) => {
        try {
            if (connDB.status === "ERRO") {
                reject({ status: "ERRO", payload: connDB.payload });
            }

            const conn = connDB.payload;

            conn.query("UPDATE products set ordination=? where ordination=?", [data.oldOrder, data.currentOrder]).then(res => {
                conn.query("UPDATE products set ordination=? where id=?", [data.newOrder, data.id]).then(resp => {
                    resolve({ status: "OK", payload: resp });
                }).finally(_ => {
                    conn.release();
                });
            });
        }
        catch (err) {
            reject({ status: "ERRO", payload: err });
        }
    });
}