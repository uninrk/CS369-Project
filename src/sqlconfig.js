const sql = require("mssql");
const express = require("express");
var app = express();

const config = {
    server: 'INKU\\SQLEXPRESS',
    database: 'Northwind',
    user: 'sa',
    password: 'P@ssw0rd',
    encrypt: false,
    trustServerCertificate: false
};

const getAllProducts = async () => {
    try {
        const pool = await sql.connect(config);
        const sqlQuery = 'SELECT * FROM Products';
        const result = await pool.request().query(sqlQuery);
        return result.recordset
    } catch (err) {
        throw err;
    }
}

exports.getAllProducts = getAllProducts;

// async function getAllProducts() {
//     try {
//         await sql.connect(config);
//         const result = await sql.query`SELECT * FROM Products`;
//         return result.recordset;
//     } catch (err) {
//         console.error('SQL error:', err);
//         throw err;
//     }
// }

// module.exports = {
//     getAllProducts
// };

// sql.connect(config)
//     .then(pool => {
//         return pool.request().query('SELECT * FROM Products WHERE ProductID = 77');
//     }).then(result => {
//         console.log('ProductID:', result.recordset[0].ProductID);
//         console.log('ProductName:', result.recordset[0].ProductName);
//         console.log('SupplierID:', result.recordset[0].SupplierID);
//         console.log('CategoryID:', result.recordset[0].CategoryID);
//         console.log('QuantityPerUnit:', result.recordset[0].Unit);
//         console.log('UnitPrice:', result.recordset[0].Price);
//         console.log('UnitsInStock:', result.recordset[0].UnitsInStock);
//         console.log('UnitsOnOrder:', result.recordset[0].UnitsOnOrder);
//         console.log('ReorderLevel:', result.recordset[0].ReorderLevel);
//         console.log('Discontinued:', result.recordset[0].Discontinued);
//         console.log('output:', result.output);
//         console.log('rowsAffected:', result.rowsAffected);
//     }).catch(err => {
//         console.error('Error:', err);
//     });

// const sqlConfig = {
//     user: 'sa',
//     password: 'P@ssw0rd',
//     database: 'Northwind',
//     server: 'LAPTOP-FLA3D2A9\\SQLEXPRESS',
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false, // for azure
//         trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }