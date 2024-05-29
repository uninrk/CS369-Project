const sql = require("mssql");
const express = require("express");
var app = express();
const cors = require('cors');

// Enable CORS
app.use(cors());
app.use(express.json());

const config = {
    server: 'demo.c3wmusagggqn.us-east-1.rds.amazonaws.com',
    database: 'Northwind',
    user: 'sa',
    password: 'Password',
    encrypt: false,
    trustServerCertificate: false,
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

const getDetailProducts = async (ProductID) => {
    try {
        const pool = await sql.connect(config);
        const sqlQuery = `
            SELECT 
                p.ProductID,
                p.ProductName,
                p.UnitPrice,
                p.CategoryID,
                c.CategoryName,
                c.Description,
                p.UnitsInStock,
                p.Image
            FROM 
                Products p
            JOIN 
                Categories c
            ON 
                p.CategoryID = c.CategoryID
            WHERE 
                p.ProductID = @ProductID
        `;
        const result = await pool.request()
            .input('ProductID', sql.Int, ProductID)
            .query(sqlQuery);
        return result.recordset;
    } catch (err) {
        throw err;
    }
};


module.exports = {
    config,
    getAllProducts,
    getDetailProducts,
};
