var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  var dbo = db.db("LostItems");
  /*dbo.createCollection("Items", function (err, res) {
    //if (err) throw err;
    //console.log("Collection created!");*/
  var myobj = [
    {
      name: "perfume",
      location: "church street",
      desc: "flowery scented perfume by chanel, glass bottle",
      category: "perfumes and deoderants",
      email: "abcd@gmail.com",
      phone: "+91-975-5593-073",
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chanel-eau-tendre-1549461540.jpg?crop=1xw:1xh;center,top&resize=480:*",
    },
  ];
  /*
    {
      name: "wallet",
      location: "mayo hall",
      desc:
        "brown colour, fake leather, men's wallet, 500 rupees and credit card inside",
      category: "bags and wallets",
      email: "breid@nvapplelab.com",
      phone: "+91-755-5954-634",
      image:
        "https://5.imimg.com/data5/RR/AI/JW/SELLER-1970952/teakwood-genuine-leather-wallet-500x500.jpg",
    },

    {
      name: "tupperware bottle",
      location: "phoenix marketcity",
      desc: "orange colour, small sized, empty bottle",
      category: "water bottles",
      email: "nigomi2628@dkt1.com",
      phone: "+91-755-5542-522",
      image:
        "https://gomart.ca/wp-content/uploads/2020/02/187-extra-small-water-bottle-1.jpg",
    },

    {
      name: "tiffin box",
      location: "pes university, electronic city",
      desc: "steel oval shaped tiffin box",
      category: "containers",
      email: "sajodat120@dkt1.com",
      phone: "+91-915-5569-824",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOyx4QZidm9kTjAWTJxry7lsEGLryhcK24isoEWhxVY1JBDId-_6_2eADQ8JxPPlzJQ7xBVXLwHY&usqp=CAc",
    },

    {
      name: "plastic bottle",
      location: "kempagowda airport",
      desc: "steel, no brand mentioned, 1 litre capacity",
      category: "water bottles",
      email: "howoco7442@questza.com",
      phone: "+91-755-5709-388",
      image:
        "https://5.imimg.com/data5/NI/SL/JW/SELLER-80634721/1-kg-aluminium-bottles-500x500.jpg",
    },

    {
      name: "adidas jacket",
      location: "church street",
      desc: "black colour, mens jacket, no hoodie",
      category: "clothing",
      email: "dilomi1368@xhypm.com",
      phone: "+91-855-5981-877",
      image:
        "https://i.pinimg.com/236x/76/20/4c/76204c5eb1823201d86620b8f1b34e1b--mens-jackets-adidas-superstar.jpg",
    },

    {
      name: "file",
      location: "mg road",
      desc: "pink colour, normal stick file with a printout inside",
      category: "stationary",
      email: "hadije7541@questza.com",
      phone: "+91-855-5224-310",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDVM6-JSzGl0bYpLPpZGEvq8jJccQxGRX1jA&usqp=CAU",
    },

    {
      name: "tiffin box",
      location: "whitefield social",
      desc: "pink coloured, round tiffin box by milton",
      category: "containers",
      email: "jehiyeg294@questza.com",
      phone: "+91-855-5526-684",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH5lf1WtZjNC4E_QN95j-817YBYEySXxbeJg&usqp=CAU",
    },

    {
      name: "wristwatch",
      location: "plan b",
      desc: "red colour, slender ladies watch by titan",
      category: "wristwatches",
      email: "vedefa2237@dkt1.com",
      phone: "+91-755-5454-381",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlN4El1pPQVoJCtsVTblT9IZoi2SlBLXGBnyH2X_y6apH6fyzHWGZxT2G8uO2eWINCjB5zw&usqp=CAc",
    },

    {
      name: "paintbrush",
      location: "amaatra academy",
      desc: "unopened set of 4 paintbrushes by camlin",
      category: "stationary",
      email: "jibaco2638@xhypm.com",
      phone: "+91-945-5576-179",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYvQ7TaQoA2knMNW-ZBFj0-hpd5R17qLV4CCe9Wvyy9KcJr6qrySP8adafxrIAdB-CoQarPuo&usqp=CAc",
    },

    {
      name: "guitar strings",
      location: "garuda mall",
      desc: "acoustic guitar strings by daddario",
      category: "musical instruments",
      email: "kisiv94804@dkt1.com",
      phone: "+91-985-5587-778",
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTQBic2XzwZcSSSHSwfA9xz6ji7FxymZsksPNlb_figfrckWpqAQE4751ySm7w&usqp=CAc",
    },

    {
      name: "the Bell Jar book",
      location: "amaatra academy",
      desc: "novel",
      category: "books",
      email: "gabihi3611@questza.com",
      phone: "+91-975-5520-163",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmjQqkhNsD07sq1bWDgTBygCOqluJJPnWtjlT_8rMtpTg6eYQ8xja484TcyIUgOnhyleO3FlM80ZIS6DP71UPVMSYmy3CfZM&usqp=CAU&ec=45732300",
    },

    {
      name: "rough book",
      location: "dps east",
      desc: "premium notebook, purple patterned cover, no name",
      category: "books",
      email: "vayoda8814@questza.com",
      phone: "+91-855-5548-069",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMga9Ym-gTBtDYvjIO8o9fwcscquiazqCp5PfUCTvr095ZetIn5FWfxP77A&usqp=CAc",
    },

    {
      name: "parker pen",
      location: "pes university, ring road",
      desc: "blak colour parker pen",
      category: "stationary",
      email: "dadehe1281@xhypm.com",
      phone: "+91-955-5560-370",
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSnVr5OZtklOIFM32dFN-6v-K6fhDazsE5qcy-yQiqN7j7eAYsAaBaSqc1qIQ1gpO97unMribSuTw&usqp=CAc",
    },

    {
      name: "purse",
      location: "sapna bookhouse, indiranagar",
      desc: "white colour big handbag by hidesign",
      category: "bags and wallets",
      email: "tavoy42921@dkt1.com",
      phone: "+91-945-5537-574",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIEIv9Qt8_sZNOeqIaNzLoQuvckNCA9tOPhzEj4BJQHkYbrLtEig8OrF5HVquaMLuWt3yAlXkuNExLcwYZAS6h5kXWcGwOW2U&usqp=CAU&ec=45732300",
    },

    {
      name: "planner",
      location: "cafe coffee day, forum",
      desc: "black colour planner belonging to person named aravind iyer",
      category: "books",
      email: "hadipi6162@xhypm.com",
      phone: "+91-855-5981-877",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LI-FO5-40HpeKMQp_fAkLg31UqE9CLZkJYtF6pBTtN3ilDMkWh2pF6zKJaYzqGl5ZnU0O9uejcwD0QftjbcGViKvWuTc4uE&usqp=CAU&ec=45732300",
    },

    {
      name: "headphones",
      location: "forum value mall",
      desc: "yellow colour, brand is skull candy ",
      category: "electronics",
      email: "rimig19921@tdcryo.com",
      phone: "+91-935-5583-615",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSjxoQYaeBAhA0_vFYMnmVOJXSlboO_ORIw203rgpeEBf8QUv9Uyq-6j8UEMTRvTnSYyR-A&usqp=CAc",
    },

    {
      name: "keychain",
      location: "garuda mall",
      desc:
        "red colour keychain with 2 keys attached to it with text that says open house",
      category: "other",
      email: "togefig144@tdcryo.com",
      phone: "+91-925-5570-170",
      image:
        "https://c8.alamy.com/comp/MNJ3D2/plastic-key-ring-with-open-house-tag-attached-on-two-metal-keys-on-isolated-white-background-MNJ3D2.jpg",
    },

    {
      name: "watch",
      location: "tacobell,brookfield",
      desc: "silver colour mens watch by fastrack",
      category: "wristwatches",
      email: "vafoce5786@dkt1.com",
      phone: "+91-975-5571-584",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_sihaS1gXRZVGZiWyL2lV2hpZsbBF3ttpG2yoK57aLyI2j4kFF0veXsDN9g&usqp=CAc",
    },

    {
      name: "groceries",
      location: "ragam supermarket",
      desc: "white cloth bag with brown border",
      category: "other",
      email: "hagig75632@xhypm.com",
      phone: "+91-955-5560-370",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgFlgMMm5qA7fzyyF__E96c-7aOCrAyYcytQ&usqp=CAU",
    },

    {
      name: "scarf",
      location: "vr mall",
      desc: "plain baby pink coloured scarf",
      category: "other",
      email: "johas98814@5y5u.com",
      phone: "+91-755-5520-156",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIaVBfnH6W6tnxeAzvPh-Rv2B57_CJBXDAjg&usqp=CAU",
    },

    {
      name: "guitar capo",
      location: "infant jesus church",
      desc: "standard size black capo",
      category: "musical instruments",
      email: "cejelih211@ofdow.com",
      phone: "+91-855-5258-484",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Ig0peke1NOSKou2UIU3kIdv88OR7f5unkw&usqp=CAU",
    },

    {
      name: "i phone charger",
      location: "starbucks, phoneix",
      desc: "plain black charger for an iphone",
      category: "electronics",
      email: "kavin95218@btsese.com",
      phone: "+91-955-5560-370",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwWn8nH_FYE4a4sDD0wHLXLPlO5JUSTqWx9g&usqp=CAU",
    },

    {
      name: "powerbank",
      location: "blossom bookhouse, church street",
      desc: "bright blue colour, rectangular and thin powerbank",
      category: "electronics",
      email: "magoh72672@58as.com",
      phone: "+91-855-5607-190",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwpYASbh_bJRxRnI9YSFCgiv5l8sINo6YZo4YRU9cTsxjEBvbQsc8Yd2-3Zvor_-hjeMgQRq4&usqp=CAc",
    },

    {
      name: "transparent pouch",
      location: "columbia asia",
      desc: "fairly large transparent pouch with toiletries inside",
      category: "other",
      email: "xagofe2774@btsese.com",
      phone: "+91-855-5981-877",
      image:
        "https://i.pinimg.com/originals/39/1b/68/391b68d23ebfe8586a570bd95e039759.jpg",
    },
  ];*/

  dbo.collection("Items").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
