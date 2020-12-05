const express = require("express");
const router = express.Router();
const model = require("./model");

router.get("/getItems", (req, res) => {
  // res.send('Hello World!')
  const docs = model
    .find({})
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log("error");
    });
});

/*/
router.post("/selected", (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, JSON");
  console.log("this-" + req.body);
  // res.send('Hello World!')
  /*const docs = item.find({}).then((data)=>
     {
       console.log(data);
       res.json(data);
     })
     .catch((err)=>{
       console.log("error")
     });
     */
//});
