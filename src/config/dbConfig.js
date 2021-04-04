
import mariadb from "mariadb";
import 'dotenv/config.js';

async function getConnection() {
    return new Promise((resolve, reject) => {
        try {
            const pool = mariadb.createPool({
                host: process.env.SQL_HOST,
                port: process.env.SQL_PORT,
                user: process.env.SQL_USER,
                password: process.env.SQL_PASS,
                database: process.env.SQL_DB_NAME
            });
            pool.getConnection().then(conn => {
                console.log("Conexão com o DB feita!");
                resolve({ status: "OK", payload: conn });
            }).catch(err => {
                console.log("Problema com a conexão com o DB!");
                reject({ status: "ERRO", payload: err })
            });
        } catch (err) {
            reject({ status: "ERRO", payload: err })
        }
    })
}

const conn = await getConnection()

export default conn;