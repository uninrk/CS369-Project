const { config } = require('./sqlconfig.js');
const { getAllProducts, getDetailProducts,addNewProduct } = require('./sqlconfig.js');
var express = require('express');
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const sql = require('mssql');
const port = 8080;
const fs = require('fs');


// Enable CORS
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

app.get('/api/products', async (req, res, next) => {
    try {
        res.set('Access-Control-Allow-Origin', '*');
        const result = await getAllProducts();
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

app.post('/api/products/add', upload.single('Image'), async (req, res) => {
    const {
      ProductName,
      SupplierID,
      CategoryID,
      QuantityPerUnit,
      UnitPrice,
      UnitsInStock,
      UnitsOnOrder,
      ReorderLevel,
      Discontinued,
    } = req.body;
    const image = req.file ? req.file.path : null;
  
    try {
      console.log('Connecting to database...');
      const pool = await sql.connect(config);
      console.log('Connected to database.');
  
      console.log('Inserting new product...');
  
      // Read the image file asynchronously
      fs.readFile(req.file.path, async (err, imageBuffer) => {
          if (err) {
              console.error('Error reading image file:', err);
              return res.status(500).json({ success: false, message: 'An error occurred while reading the image file' });
          }
      
          try {
              console.log('Inserting new product...');
              console.log('Image data:', imageBuffer); // Log the content of the imageBuffer variable
      
              const result = await pool.request()
                  .input('ProductName', sql.VarChar, ProductName)
                  .input('SupplierID', sql.Int, SupplierID)
                  .input('CategoryID', sql.Int, CategoryID)
                  .input('QuantityPerUnit', sql.VarChar, QuantityPerUnit)
                  .input('UnitPrice', sql.Decimal(10, 2), UnitPrice)
                  .input('UnitsInStock', sql.Int, UnitsInStock)
                  .input('UnitsOnOrder', sql.Int, UnitsOnOrder)
                  .input('ReorderLevel', sql.Int, ReorderLevel)
                  .input('Discontinued', sql.Bit, Discontinued)
                  .input('Image', sql.VarBinary(sql.MAX), imageBuffer) // Use imageBuffer instead of Image
                  .query(`
                      INSERT INTO Products 
                      (ProductName, SupplierID, CategoryID, QuantityPerUnit, UnitPrice, UnitsInStock, UnitsOnOrder, ReorderLevel, Discontinued, Image)
                      VALUES 
                      (@ProductName, @SupplierID, @CategoryID, @QuantityPerUnit, @UnitPrice, @UnitsInStock, @UnitsOnOrder, @ReorderLevel, @Discontinued, @Image);
                      SELECT SCOPE_IDENTITY() AS ProductID;
                  `);
      
              const productId = result.recordset[0].ProductID;
              console.log('Product inserted with ID:', productId);
      
              res.status(200).json({ productId, message: 'Product added successfully' });
          } catch (error) {
              console.error('Error inserting product:', error);
              res.status(500).json({ success: false, message: 'An error occurred while adding the product' });
          }
      });
    } catch (error) {
      console.error('Error connecting to database:', error);
      res.status(500).json({ success: false, message: 'An error occurred while connecting to the database' });
    }
});

  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });