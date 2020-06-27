var express = require("express");
var app = express();
app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("app");
});

app.get("/calculate", function (req, res) {
  res.render("calculate");
});

app.get("/map", function (req, res) {
  res.render("map");
});
app.get("/results", function (req, res) {
  res.render("results");
});

// app.get("*", function (req, res) {
//   res.send("ERROR 404: PAGE NOT FOUND");
// });

app.listen(process.env.PORT || 3000, function () {
  console.log("Server On");
});
