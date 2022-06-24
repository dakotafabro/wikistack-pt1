const express = require("express");
const { User, Page } = require("../models");
const router = express.Router();

const userList = require("../views/userList");
const userPages = require("../views/userPages");

router.get("/", async (req, res, next) => {
  try {
    const users = await Users.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId,
      },
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
