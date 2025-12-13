require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = require("./db");



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
