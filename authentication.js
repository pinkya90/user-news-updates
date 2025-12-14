const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// -------- Generate OTP --------
app.post("/generate-otp", (req, res) => {
    const { mobile } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP

    // Check if user exists
    const checkUser = "SELECT * FROM userdata WHERE mobile = ?";
    db.query(checkUser, [mobile], (err, result) => {
        if (err) return res.status(500).send("DB Error");

        if (result.length === 0) {
            return res.status(404).send("Mobile number not found!");
        }

        // Save OTP in database
        const updateOtp = "UPDATE userdata SET otp = ? WHERE mobile = ?";
        db.query(updateOtp, [otp, mobile], (err2) => {
            if (err2) return res.status(500).send("Error saving OTP");

            res.send({
                message: "OTP generated",
                otp: otp // (Only visible for testing; remove in production)
            });
        });
    });
});

// -------- Verify OTP --------
app.post("/verify-otp", (req, res) => {
    const { mobile, otp } = req.body;

    const query = "SELECT * FROM userdata WHERE mobile = ? AND otp = ?";
    db.query(query, [mobile, otp], (err, result) => {
        if (err) return res.status(500).send("DB Error");

        if (result.length > 0) {
            res.send({ message: "OTP Verified Successfully" });
        } else {
            res.status(400).send({ message: "Invalid OTP" });
        }
    });
});

app.listen(5000, () => console.log("Server running on :http://localhost:5000/"));
