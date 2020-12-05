var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("LostItems");
  var myobj = [
    {
      user: "jameswhittle",
      password: "vaetevy45",
      email: "ixonifedd-5987@yopmail.com",
    },

    {
      user: "davidgoliath",
      password: "cdWEWETBW",
      email: "breid@nvapplelab.com",
    },

    {
      user: "jeremiah",
      password: "weeping12",
      email: "nigomi2628@dkt1.com",
    },

    {
      user: "saultopaul",
      password: "verehnt45",
      email: "sajodat120@dkt1.com",
      phone: "+91-915-5569-824",
    },

    {
      user: "priscilla",
      password: "jechjkqw123",
      email: "howoco7442@questza.com",
    },

    {
      user: "maryofnaz",
      password: "prov31",
      email: "dilomi1368@xhypm.com",
    },

    {
      user: "admin",
      password: "password34",
      email: "hadije7541@questza.com",
    },

    {
      user: "petercephas",
      password: "efhihecifi",
      email: "jehiyeg294@questza.com",
    },

    {
      user: "john",
      password: "the_baptist",
      email: "vedefa2237@dkt1.com",
    },

    {
      user: "abraham",
      password: "xu2hdwhioow",
      email: "jibaco2638@xhypm.com",
    },

    {
      user: "grace",
      password: "gracethroughfaith",
      email: "kisiv94804@dkt1.com",
    },

    {
      user: "israel",
      password: "g0verenedbyg0d",
      email: "gabihi3611@questza.com",
    },

    {
      user: "sarahjohn",
      password: "dwehudh3j37",
      email: "vayoda8814@questza.com",
    },

    {
      user: "abigail",
      password: "dwihie382",
      email: "dadehe1281@xhypm.com",
    },

    {
      user: "hebrews",
      password: "romanswci32",
      email: "tavoy42921@dkt1.com",
    },

    {
      user: "deborah",
      password: "femalejudge",
      email: "hadipi6162@xhypm.com",
    },

    {
      user: "lydia",
      password: "business3u128",
      email: "rimig19921@tdcryo.com",
    },

    {
      user: "lukegospel",
      password: "uch23hd83",
      email: "togefig144@tdcryo.com",
    },

    {
      user: "matthewthomas",
      password: "doubtnot2ecedq",
      email: "vafoce5786@dkt1.com",
    },

    {
      user: "runningoutofnames",
      password: "dc2hduh77",
      email: "hagig75632@xhypm.com",
    },

    {
      user: "josiah",
      password: "dxni3hir34",
      email: "johas98814@5y5u.com",
    },

    {
      user: "jonathan",
      password: "kewhcdi3hi",
      email: "cejelih211@ofdow.com",
    },

    {
      user: "theginger",
      password: "xhduhei32ur832748",
      email: "kavin95218@btsese.com",
    },

    {
      user: "twomore",
      password: "xwhhi232387",
      email: "magoh72672@58as.com",
    },

    {
      user: "smkvsts",
      password: "c23rty65y56",
      email: "xagofe2774@btsese.com",
    },
  ];

  dbo.collection("Users").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
