const express = require("express");
const { Page } = require("../models");
const router = express.Router();

const addPage = require("../views/addPage");

const wikiPage = require("../views/wikipage");
const mainPage = require("../views/main");

router.get("/", async (req, res, next) => {
  try {
    const page = await Page.findAll();
    res.send(mainPage(page));
  } catch (error) {
    next(error);
  }
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page));
  } catch (error) {
    next(error);
  }
});
module.exports = router;
