const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // get all users
  // use userList.js
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
