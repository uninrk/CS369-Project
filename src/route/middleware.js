const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const myrouter = require('../route/products_route'); // Adjust the path as necessary
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(myrouter);

app.listen(8080, () => {
    console.log('Server running at http://localhost:8080');
});
