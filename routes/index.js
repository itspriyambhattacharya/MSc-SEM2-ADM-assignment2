const express = require("express");
const mysql2 = require("mysql2");
const route = express.Router();

const pool = mysql2.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "assign2",
  connectionLimit: 10,
  password: "mysql12345678",
});

route.use((req, res, next) => {
  console.log("Index midddleware");
  next();
});

route.get("/", (req, res) => {
  const sql = `SELECT * FROM reg1`;
  pool.query(sql, (err, results, fields) => {
    if (err) {
      console.log("Database connection failed", err.message);
      return res.status(500).send("Database Error");
    }
    res.render("index", { records: results });
  });

  // res.render("index");
});

route.post("/", (req, res) => {
  const { name, email, mob } = req.body;
  const values = [name, email, mob];
  const sql = `INSERT INTO reg1 (cname, email, mob) VALUES (?,?,?)`;
  pool.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log("Insertion failed", err.message);
      return;
    }
    console.log("Inserted successfully");
  });
  res.redirect("/");
});

module.exports = route;
