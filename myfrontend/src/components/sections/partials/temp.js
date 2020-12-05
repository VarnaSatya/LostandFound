var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("LostItems");
  dbo.createCollection("Items", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});
