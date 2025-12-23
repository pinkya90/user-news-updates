const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//require('dotenv').config();
//const db = require("./db");

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "My1stp@ssword", // your MySQL password
  database: "userdata_db"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("MySQL Connected");
});
// ---------------- REGISTER API ----------------
app.post("/api/register", (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.json({ status: "error", message: "All fields are required" });
  }

  const sql = "INSERT INTO userdata (name, email, password, mobile) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, password, mobile], (err) => {
    if (err) {
      return res.json({ status: "error", message: "User already exists or DB error" });
    }
    res.json({ status: "success", message: "User registered successfully" });
  });
});

// ---------------- LOGIN API ----------------
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM userdata WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ status: "error", message: "Database error" });
    }

    if (result.length > 0) {
      res.json({
        status: "success",
        message: "Login successful",
        name: result[0].name
      });
    } else {
      res.json({ status: "error", message: "Invalid email or password" });
    }
  });
});

// Start server
app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
