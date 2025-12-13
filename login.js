const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());     // For JSON API
app.use(express.static('public'));
require('dotenv').config();
const db = require("./db");
  
// -------------------- JSON API VERSION --------------------
 app.post('/api/login', (req, res) => {
     const { email, password } = req.body;

     // Input validation
     if (!email || !password) {
         return res.status(400).json({
             status: "error",
             message: "Email and password are required"
         });
     }

     const sql = "SELECT * FROM userdata WHERE email = ? AND password = ?";
     db.query(sql, [email, password], (err, results) => {
         if (err) {
             return res.status(500).json({
                 status: "error",
                 message: "Database error"
             });
         }

         if (results.length > 0) {
             return res.status(200).json({
                 status: "success",
                 message: "Login Successful",
                 name: results[0].name,
                 userId: results[0].id
             });
         } else {
             return res.status(401).json({
                 status: "error",
                 message: "Invalid Email or Password"
             });
       }
    });
 });
// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
