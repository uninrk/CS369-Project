let sqlconfig = require('./sqlconfig.js');
var express = require('express');
var app = express();

app.get('/api/products', async (req, res, next) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        const result = await sqlconfig.getAllProducts();
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

app.listen(8080, () => { console.log('Server is running..') });