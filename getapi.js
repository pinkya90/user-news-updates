require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();



// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Simple GET API
app.get('/users', (req, res) => {
    db.query('SELECT * FROM userdata', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
