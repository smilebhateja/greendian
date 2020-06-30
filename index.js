var express = require("express");
var app = express();
var firebase = require("firebase/app");
var admin = require("firebase-admin");
require("firebase/database");
app.use(express.static("views"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// Initialize Firebas
var firebaseConfig = {
  apiKey: "AIzaSyCXiMbrsJWqSZY70DtOvlf20RCB1EMXdn4",
  authDomain: "greendian1.firebaseapp.com",
  databaseURL: "https://greendian1.firebaseio.com",
  projectId: "greendian1",
  storageBucket: "greendian1.appspot.com",
  messagingSenderId: "548069550705",
  appId: "1:548069550705:web:aacb258044ef2c63b009d0",
  measurementId: "G-7D7CLG1FPH",
};

var serviceAccount = require("./views/greendian1-firebase-adminsdk-8r6kt-4c18fcb53e.json");
firebase.initializeApp(firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://greendian1.firebaseio.com",
});

var database = firebase.database().ref();

app.get("/", function (req, res) {
  res.render("app");
});

app.get("/calculate", function (req, res) {
  res.render("calculate");
});

app.get("/map", function (req, res) {
  res.render("map");
});

function makeId() {
  var result = "";
  var hexChars = "0123456789abcdef";
  for (var i = 0; i < 10; i += 1) {
    result += hexChars[Math.floor(Math.random() * 16)];
  }
  return result;
}

app.post("/results", function (req, res) {
  var str =
    "?state=" +
    (req.body.state || "Bihar") +
    "&gender=" +
    (req.body.gender || "male") +
    "&familyMembers=" +
    (req.body.familyMembers || 2) +
    "&electricityBill=" +
    (req.body.electricityBill || 3000) +
    "&cylinders=" +
    (req.body.cylinders || 1) +
    "&wasteBags=" +
    (req.body.wasteBags || 1) +
    "&travelBike=" +
    (req.body.travelBike || 10) +
    "&travelCar=" +
    (req.body.travelCar || 10) +
    "&cng=" +
    (req.body.cng || "no") +
    "&travelBus=" +
    (req.body.travelBus || 10) +
    "&travelTrain=" +
    (req.body.travelTrain || 1000) +
    "&travelFlightHours=" +
    (req.body.travelFlightHours || 2) +
    "&vegNonveg=" +
    (req.body.vegNonveg || "nonVeg") +
    "&dairyConsumption=" +
    (req.body.dairyConsumption || "Everyday") +
    "&meatConsumption=" +
    (req.body.meatConsumption || "Everyday") +
    "&clothesBuy=" +
    (req.body.clothesBuy || 1);
  // console.log(str);

  var currentdate = new Date();
  var date = currentdate.toDateString();
  var time =
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  var userData = {
    ...req.body,
    date: date,
    time: time,
  };

  // console.log(userData);
  const id = makeId();
  firebase
    .database()
    .ref("footprintData/" + id)
    .set(userData);
  res.redirect("results" + str);
});

app.get("/report/:userId", function (req, res) {
  res.render("report");
});

app.get("/results", function (req, res) {
  // var xx = req.params.x;
  // console.log(xx);
  // var currentdate = new Date();
  // var date = currentdate.toDateString();
  // var time =
  //   currentdate.getHours() +
  //   ":" +
  //   currentdate.getMinutes() +
  //   ":" +
  //   currentdate.getSeconds();
  // var userData = {
  //   ...req.body,
  //   date: date,
  //   time: time,
  // };
  // console.log(userData);

  // const id = makeId();
  // firebase
  //   .database()
  //   .ref("footprintData/" + id)
  //   .set(userData);

  res.render("report");
});

app.get("/action", function (req, res) {
  res.render("action");
});

app.get("/pricing", function (req, res) {
  res.render("pricing");
});

app.get("/signup-1", function (req, res) {
  res.render("signup-1");
});

app.get("/signup-2", function (req, res) {
  res.render("signup-2");
});

app.get("/signup-3", function (req, res) {
  res.render("signup-3");
});

app.get("*", function (req, res) {
  res.send("ERROR 404: PAGE NOT FOUND");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Srver On");
});
