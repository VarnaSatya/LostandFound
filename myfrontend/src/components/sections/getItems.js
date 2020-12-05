 async function run() {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
   await mongoose.connect('mongodb://localhost:27017/LostItems', { useUnifiedTopology: true ,  useNewUrlParser: true });
   

   const iSchema = new mongoose.Schema({ 
    name: String,
    location: String,
    desc: String,
    email: String,
    phone: String,
    image: String
 });
   const item = mongoose.model("Items", iSchema,"Items");
 
   const docs = await item.find({});
   console.log(docs);
   return docs;
 }

//run().then(res => console.log(res) ).catch(error => console.log(error.stack));

export default async () => {
    return await run()
}

/*
var getItem = () => {
  axios.get('/getItems')
  .then((response)=>{
    const data = response.data;
    listItem=data;
    console.log(listItem);
    console.log("Got it");
  })
  .catch(()=>{
    console.log("data");
  })
}
//getItem();
*/