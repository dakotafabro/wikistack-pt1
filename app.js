const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

const views = require("./views");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(views.main("hello world"));
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
