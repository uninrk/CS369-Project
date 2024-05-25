const express = require('express')
const router = express.Router();
// middleware
router.use((req, res, nex) => {
    console.log('middleware');
    next();
});