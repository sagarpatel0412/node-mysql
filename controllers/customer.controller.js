const express = require("express");
const router = express.Router();

const db = require("../database");

const pool = db();

router.get("/list", async (req, res) => {
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query("SELECT * FROM customers", (error, response) => {
      if (error) {
        return res.status(500).json({
          message: "error in fetching data",
        });
      } else {
        return res.status(201).json({
          message: "success",
          data: response,
        });
      }
    });
  });
});

router.get("/list/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "SELECT * FROM customers WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.post("/customer", async (req, res) => {
  const { cusname, contact } = req.body;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to connect",
      });
    }
    connection.query(
      "INSERT INTO customers(cusname,contact) VALUES(?,?)",
      [cusname, contact],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in posting data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.put("/customer/:id", async (req, res) => {
  const ids = req.params.id;
  const { cusname, contact } = req.body;

  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "UPDATE customers SET cusname=?, contact=? WHERE id = ?",
      [cusname, contact, ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

router.delete("/customer/:id", async (req, res) => {
  const ids = req.params.id;
  await pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json({
        message: "Fail to connect",
      });
    }
    connection.query(
      "DELETE FROM customers WHERE id = ?",
      [ids],
      (error, response) => {
        if (error) {
          return res.status(500).json({
            message: "error in fetching data",
          });
        } else {
          return res.status(201).json({
            message: "success",
            data: response,
          });
        }
      }
    );
  });
});

module.exports = router;
