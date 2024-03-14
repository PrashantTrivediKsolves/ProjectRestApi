//connection
const mongoose=require('mongoose');

mongoose.set("strictQuery",true);
async function connectMongoDb(url)
{
    return mongoose.connect(url);

}
module.exports={
    connectMongoDb,
};


// .then(()=>console.log("MongoDb connected"))
// .catch((err)=>console.log("Mongo Error",err));
