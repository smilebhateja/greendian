var express = require("express");
var app = express();
app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("app");
});

app.get("*", function (req, res) {
  res.send("ERROR 404: PAGE NOT FOUND");
});

app.listen(3000 || process.env.PORT, function () {
  console.log("Server On");
});
