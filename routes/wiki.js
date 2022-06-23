const express = require("express");
const { Page } = require("../models");
const router = express.Router();

const addPage = require("../views/addPage");

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const slug = Page.hooks.generateSlug(title);

  try {
    const page = await Page.create({
      title: title,
      content: content,
      slug: slug,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
