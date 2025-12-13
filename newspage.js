const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.static("public"));
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
const db = require("./db");




// Image Upload Settings
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// POST API – Create News Article
app.post("/api/news", upload.single("image"), (req, res) => {
    const { title, content, author, date, status } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = "INSERT INTO news (title, content, author, date, status, image) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [title, content, author, date, status, image], (err, result) => {
        if (err) return res.json({ error: err });
        res.json({ message: "News added successfully!" });
    });
});

// GET API – Get All News
app.get("/api/news", (req, res) => {
    const sql = "SELECT * FROM news";
    db.query(sql, (err, data) => {
        if (err) return res.json({ error: err });
        res.json(data);
    });
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
