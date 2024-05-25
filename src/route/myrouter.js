const express = require('express')
const router = express.Router()
const path = require('path')

const appPage = path.join(__dirname, `../src/App.js`)
const detailPage = path.join(__dirname, `../src/detailPage.js`)
// const orderPage = path.join(__dirname, `../page/Order.html`)
router.get("/", (req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(appPage)
})
router.get("/detailPage", (req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(empPage)
})

module.exports = router