const db = require("./db");

// SQL query to create userdata table

const createUsersTable = `CREATE TABLE IF NOT EXISTS userdata (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(100),
   email VARCHAR(100),
   password VARCHAR(255),
   mobile VARCHAR(15)
);
`;

// Run migration to create userdata table

db.query(createUsersTable, (err, result) => {
  if (err) {
    console.error("Migration failed:", err);
    return;
  }
  console.log("Users table created successfully");
  process.exit();
});


// SQL query to add otp column to userdata table

const addOtpColumn = `ALTER TABLE userdata 
ADD COLUMN otp VARCHAR(10);`;

// Run migration to add otp column

db.query(addOtpColumn, (err) => {
  if (err) {
    console.error("Error adding OTP column:", err);
    return;
  }
  console.log("OTP column added successfully");
  process.exit();
});




// SQL query to create news table

const createNewsTable = `CREATE TABLE IF NOT EXISTS news (id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  author VARCHAR(100),
  date DATE,
  status VARCHAR(20),
  image VARCHAR(255)
);`;

// Run migration for news table

db.query(createNewsTable, (err) => {
  if (err) throw err;
  console.log("News table created");
  process.exit();
});