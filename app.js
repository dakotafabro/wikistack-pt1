const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const views = require("./views");
const { db } = require("./models");

const wikiRouter = require("./routes/wiki");

app.use(express.urlencoded({ extended: false }));

app.use("/wiki", wikiRouter);

app.get("/", (req, res) => {
  res.send(views.main("hello world"));
});

db.authenticate().then(() => {
  console.log("💻 connected to the database");
});

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
