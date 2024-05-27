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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const secretKey = '123456789';

app.post('/api/login', async (req, res) => {
    const { Username, Password } = req.body;
    console.log(Username, Password);
  
    try {
      console.log('Connecting to database...');
      const pool = await sql.connect(config);
      console.log('Connected to database.');
  
      // Look up user by Username
      const userRecord = await pool.request()
        .input('Username', Username)
        .query(`SELECT * FROM "Login" WHERE Username = @Username`);
  
        if (userRecord.recordset.length === 0) {
            return res.status(400).send({ message: 'Invalid username or password.' });
        }
  
      const user = userRecord.recordset[0]; // Assuming there's only one matching user
  
      console.log('Comparing passwords...');
  
      // Hash the incoming password using bcrypt
      const passwordMatches = await bcrypt.compare(Password, user.PasswordHash);
  
      console.log(passwordMatches)
      if (!passwordMatches) {
        return res.status(401).json({ message: 'Not match' });
      }
  
      // Generate JWT token
      const payload = { userId: user.UserID }; // Include user ID in the payload
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set expiration time
  
      console.log('Login successful, generating token...');
  
      // Handle successful login
      res.cookie('token', token, { httpOnly: true });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    } finally {
      sql.close();
    }
  });
  





  app.post('/api/register', async (req, res) => {
    const { Username, Password } = req.body;
  
    if (!Username || !Password ) {
      return res.status(400).send('Username and password are required.');
    }
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(Password, 10);
  
      // Connect to the database
      const pool = await sql.connect(config);
  
      // Insert user data using parameterized query
      await pool.request()
        .input('Username', Username)
        .input('hashedPassword', hashedPassword)
        .query(`
          INSERT INTO Login (Username, PasswordHash)
          VALUES (@username, @hashedPassword)
        `);
  
      res.send('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).send('Internal server error. Failed to register user.');
    } finally {
      sql.close();
    }
  });

  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });