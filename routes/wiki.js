const express = require("express");
const { Page, User } = require("../models");
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
  const name = req.body.name;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const slug = Page.hooks.generateSlug(title);

  try {
    const page = await Page.create({
      title: title,
      content: content,
      slug: slug,
    });
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: name,
        email: email,
      },
    });

    await page.setAuthor(user);

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
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});
module.exports = router;
