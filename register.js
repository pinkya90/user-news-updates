const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());     // For JSON API
app.use(express.static('public'));
require('dotenv').config();
const db = require("./db");


// -------------------- VALIDATION FUNCTION --------------------
function validateUser({ name, email, password, mobile }) {
    if (!name || name.length < 3) return "Name must be at least 3 characters";
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return "Invalid email format";

    if (!password || password.length < 6)
        return "Password must be at least 6 characters";

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile))
        return "Mobile number must be 10 digits";

    return null;
}

// -------------------- JSON API VERSION --------------------
app.post('/api/register', (req, res) => {
    const { name, email, password, mobile } = req.body;

    // Validation
    const validationError = validateUser({ name, email, password, mobile });
    if (validationError) {
        return res.status(400).json({ status: "error", message: validationError });
    }

    const sql = "INSERT INTO userdata(name, email, password, mobile) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, password, mobile], (err, result) => {
        if (err) {
            return res.status(500).json({ status: "error", message: "Database Error" });
        }

        res.status(201).json({
            status: "success",
            message: "User Registered Successfully",
            userId: result.insertId
        });
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});