// const express=require("express");

// const fs=require('fs');
// const mongoose=require('mongoose');
// const users=require("./MOCK_DATA.json");

// const app=express();
// // connection

// mongoose.connect('mongodb://127.0.0.1:27017/Mern2024')
// .then(()=>console.log("MongoDb connected"))
// .catch((err)=>console.log("Mongo Error",err));


// // Schema

// const userSchema=new mongoose.Schema({
//     firstName:{
//         type:String,
//         required:true,
//     },
//     lastName:
//     {
//         type:String,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     jobTitle:{
//         type:String,
//     },
//     gender:{
//         type:String,
//     }
// })

// const User=mongoose.model("user",userSchema);
// const port=8000;

// // MiddleWare -plugin
// app.use(express.urlencoded({extended:false}));// plagin
// // Routes
// app.use((req,res,next)=>{
//     console.log("Hello form mddle ware 1");
//     // return res.json("Hello from middle 1")
//     fs.appendFile('log.txt', `${Date.now()}: ${req.method}:${req.path}`,(err,data)=>
//     {
//         req.myUserName="piyushgag.dev";
//         next();
//     });
    
// });
// app.use((req,res,next)=>{
//     console.log("Hello form mddle ware 2",req.myUserName);
//     // return res.json("Hello from middle 2")
//     // return res.send("hey");
//     next();
// });

// // here we are doing the server side rendring ......
// app.get('/users',(req,res)=>
// {
//     const html=`
//     <ul>
//     ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
//     </ul>
//     ` ;
//     res.send(html);
// })

// app.listen(port,()=>console.log("Sever started "));

// // first

// app.get('/api/users',(req,res)=>
// {
//     res.setHeader("x-myname","prashant kumar");
//     // console.log(req.headers);

//     // Always add x to custom header

//     console.log("I am in get route",req.myUserName);
//     const result=res.json(users);

//     // console.log(result);
//     return result;
// })

// // dyamic path parmeters.......
// // app.get('/api/users/:id',(req,res)=>
// // {
// //     const id=Number(req.params.id);
// //     const user=users.find((user)=>user.id===id);
// //     return res.json(user);
// // })


// // post api...
// app.route('/api/users/:id').get(

// (req,res)=>
// {
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     if(!user) return res.status(404).json({error:"User not found"});
//     return res.json(user);
// }
// ).patch((eq,res)=>{
//     // edit user with id
//     return res.json({status:"Pending"})
// }).delete((req,res)=>{
//     // delete user with id
//     return res.json({status:"Pending"})
// });

// app.post('/api/users',(req,res)=>
// {
//     // create new server...
//     const body=req.body;
//     if(!body||!body.first_name||!body.email||!body.gender||!body.last_name||!body.job_title)
//     {
//         return res.status(400).json({msg:"All fields are required"});
//     }
//     users.push({...body,id:users.length+1});
//     fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(er,data)=>
//     {
//         return res.status(200).json({status:"success",id:users.length})
//     });
//     console.log('Body',body);
    
// });

// app.patch('/api/users/:id',(req,res)=>
// {

// });

// app.delete('/api/users/:id',(req,res)=>
// {

// });

//now connecting the mongodb
const express=require("express");

const fs=require('fs');
const mongoose=require('mongoose');
// const users=require("./MOCK_DATA.json");

const app=express();
// connection

mongoose.connect('mongodb://127.0.0.1:27017/Mern2024')
.then(()=>console.log("MongoDb connected"))
.catch((err)=>console.log("Mongo Error",err));


// Schema

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:
    {
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    }
},
{timestamps:true}
)

const User=mongoose.model("user",userSchema);
const port=8000;

// MiddleWare -plugin
app.use(express.urlencoded({extended:false}));// plagin
// Routes
app.use((req,res,next)=>{
    console.log("Hello form mddle ware 1");
    // return res.json("Hello from middle 1")
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}:${req.path}`,(err,data)=>
    {
        req.myUserName="piyushgag.dev";
        next();
    });
    
});
app.use((req,res,next)=>{
    console.log("Hello form mddle ware 2",req.myUserName);
    // return res.json("Hello from middle 2")
    // return res.send("hey");
    next();
});

// here we are doing the server side rendring ......
app.get('/users',async(req,res)=>
{
    const allDbUses=await User.find({})
    const html=`
    <ul>
    ${allDbUses.map((user)=>`<li>${user.firstName}- ${user.email}</li>`).join("")}
    </ul>
    ` ;
    res.send(html);
})

app.listen(port,()=>console.log("Sever started "));

// first

app.get('/api/users',async(req,res)=>
{
    const allDbUses=await User.find({})
    // custom header
    res.setHeader("x-myname","prashant kumar");
    // console.log(req.headers);

    // Always add x to custom header

    console.log("I am in get route",req.myUserName);
    const result=res.json(allDbUses);

    // console.log(result);
    return result;
})

// dyamic path parmeters.......
// app.get('/api/users/:id',(req,res)=>
// {
//     const id=Number(req.params.id);
//     const user=users.find((user)=>user.id===id);
//     return res.json(user);
// })


// post api...
app.route('/api/users/:id').get(

async(req,res)=>
{
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"User not found"});
    return res.json(user);
}
).patch(async(req,res)=>{
    // edit user with id
    await User.findByIdAndUpdate(req.params.id,{lastName:"Changed"})
    return res.json({status:"success"})
}).delete(async(req,res)=>{
    // delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"Success"});
    // return res.json({status:"Pending"})
});

app.post('/api/users',async(req,res)=>
{
    // create new server...
    const body=req.body;
    if(!body||!body.first_name||!body.email||!body.gender||!body.last_name||!body.job_title)
    {
        return res.status(400).json({msg:"All fields are required"});
    }
    const result=await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title
    })
    console.log(result);
    return res.status(201).json({msg:"Success"});
    
});

app.patch('/api/users/:id',(req,res)=>
{

});

app.delete('/api/users/:id',(req,res)=>
{
    // await User.findByIdAndDelete(req.params.id);
    // return res.json({status:"Success"});
});

// // //now connecting the mongodb

// const mongoose=require('mongoose');
// const express=require("express");
// const {connectMongoDb}=require("./connection");
// const {logReqRes}=require("./middleware");
// const userRouter=require('./routes/user');
// const fs=require('fs');
// // const users=require("./MOCK_DATA.json");

// const app=express();
// const port=8000;
// // Connection
// connectMongoDb("mongodb://127.0.0.1:27017/Mern2024").then(()=>
// {
//     console.log("mongoDb connected");
// })

// // MiddleWare -plugin
// app.use(express.urlencoded({extended:false}));// plagin
// // Routes
// // app.use((req,res,next)=>{
// //     console.log("Hello form mddle ware 2",req.myUserName);
// //     // return res.json("Hello from middle 2")
// //     // return res.send("hey");
// //     next();
// // });

// // here we are doing the server side rendring ......

// app.use(logReqRes("log.txt"));
// app.use("/user",userRouter)

// app.listen(port,()=>console.log("Sever started "));



// // dyamic path parmeters.......
// // app.get('/api/users/:id',(req,res)=>
// // {
// //     const id=Number(req.params.id);
// //     const user=users.find((user)=>user.id===id);
// //     return res.json(user);
// // })




// // //now connecting the mongodb



