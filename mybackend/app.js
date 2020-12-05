const express = require("express");
var request = require("request");
const app = express();
const port = 5000;
const routes = require("./router");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var MongoClient = require("mongodb").MongoClient;
mongoose.connect("mongodb://localhost:27017/LostItems", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());

mongoose.connection.on("connected", () => {
  console.log("Connected");
});

var query = { location: "-", category: "-" };
var successfulSignin = "-";

//Schema
const iSchema = new mongoose.Schema({
  name: String,
  location: String,
  desc: String,
  email: String,
  phone: String,
  image: String,
});

const uSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//image: { type:String , default: }

const item = mongoose.model("Items", iSchema, "Items");
const user = mongoose.model("Users", uSchema, "Users");

console.log("Users" + user.find({}).username);
user.find({}).then((data) => console.log("User " + data));

app.get("/getItems", (req, res) => {
  // res.send('Hello World!')
  const docs = item
    .find({})
    .then((data) => {
      //console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("error");
    });
});

app.get("/getSelectedItems", (req, res) => {
  // res.send('Hello World!')
  const docs = item
    .find(query)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("error " + err);
    });
});

app.get("/getSelected", (req, res) => {
  res.json(query);
});

app.post("/selected", function (req, res) {
  console.log("Successful " + JSON.stringify(req.body));
  query = req.body;
  res.json({
    msg: "got it finally",
  });
});

app.delete("/submitteditems", function (req, res) {
  console.log(JSON.stringify(req.body));
  item.deleteOne(req.body, function (err) {
    if (err) console.log("error while deleting item " + err);
    else console.log("Successful deletion");
  });
});

app.post("/save", function (req, res) {
  console.log("Successful " + JSON.stringify(req.body));
  var url = "mongodb://localhost:27017/";
  user
    .findOne({ user: successfulSignin })
    .then((data) => {
      if (!data) {
        console.log("no sucessful sigin");
        return res.status(204).send("no sucessful sigin");
      } else {
        console.log(JSON.parse(JSON.stringify(data)).email);
        MongoClient.connect(
          url,
          { useUnifiedTopology: true },
          function (err, db) {
            if (err) throw err;
            var dbo = db.db("LostItems");
            var myobj = req.body;
            myobj.email = JSON.parse(JSON.stringify(data)).email;
            dbo.collection("Items").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });
          }
        );
        return res.status(200).send("sucessful");
      }
    })
    .catch((err) => {
      console.log("error while getting email while submitting item: " + err);
    });
});

app.get("/submitteditems", function (req, res) {
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LostItems");
    dbo
      .collection("Users")
      .findOne({ user: successfulSignin })
      .then((data) => {
        if (!data) {
          return res.status(204).send("no sucessful sigin");
        } else {
          console.log("FROM DATA" + data.email);
          console.log("type " + typeof data);
          item.find({ email: data.email }).then((x) => {
            console.log("SUBBB " + x);
            if (x == null) return res.status(204).send("no submissions");
            else {
              res.json(x);
            }
          });
          db.close();
        }
      })
      .catch((err) => console.log("error because of submitted items"));
  });
});

app.post("/signedin", function (req, res) {
  console.log("Successful " + JSON.stringify(req.body));
  successfulSignin = req.body.username;
  res.json({
    msg: "got it finally",
  });
});

app.delete("/signedin", function (req, res) {
  successfulSignin = "-";
  res.json({
    msg: "Logged out",
  });
});

app.post("/createuser", function (req, res) {
  console.log("Successful " + JSON.stringify(req.body));
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var flag = 0;
  user
    .findOne({ user: username })
    .then((data) => {
      if (data != null) {
        console.log("Invalid username");
        return res.status(206).send("username exists");
      } else {
        console.log("username is fine");
        user
          .findOne({ email: email })
          .then((data) => {
            if (data != null) {
              console.log("Invalid email");
              return res.status(204).send("email-id already been used");
            } else {
              console.log("emailid is fine");

              var url = "mongodb://localhost:27017/";
              MongoClient.connect(url, function (err, db) {
                if (err) console.log(err);
                var dbo = db.db("LostItems");
                var myobj = {
                  user: username,
                  password: password,
                  email: email,
                };
                dbo.collection("Users").insertOne(myobj, function (err, res) {
                  if (err) throw err;
                  console.log("1 document inserted");
                  db.close();
                });
              });
            }
          })
          .catch((err) => {
            console.log("error from emailid " + err);
          });
      }
    })
    .catch((err) => {
      console.log("error from username " + err);
    });
});

app.get("/signedin", function (req, res) {
  res.json({ user: successfulSignin });
});

app.post("/user", function (req, res) {
  console.log("Successful " + JSON.stringify(req.body));
  var un = req.body;
  console.log("Query- " + un.username);
  user
    .findOne({ user: un.username, password: un.password })
    .then((data) => {
      if (data === null) {
        console.log("Invalid");
        return res.status(204).send({ error: "Invalid" });
      } else {
        console.log("data received " + data);
        const token = jwt.sign({ _id: un._id }, "qedfgvhjnjk1235fyyj80no");
        res.json({ token });
        //res.send("Valid");
      }
    })
    .catch((err) => {
      console.log("error from user " + err);
    });
});

app.use(require("body-parser").urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
