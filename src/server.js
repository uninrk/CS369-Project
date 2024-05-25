let sqlconfig = require('./sqlconfig.js');
const { getAllProducts, getDetailProducts } = require('./sqlconfig.js');
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

app.get('/api/products/:id', async (req, res) => {
    try {
        const productID = parseInt(req.params.id, 10);
        const productDetails = await getDetailProducts(productID);
        if (productDetails.length > 0) {
            res.json(productDetails[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving product details', error: err.message });
    }
});

app.listen(8080, () => { console.log('Server is running..') });