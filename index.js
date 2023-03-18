const express = require("express");
const mongoose = require("mongoose");
const Router = require("./user/routes")
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();
require('dotenv').config();
const PORT=process.env.PORT;

//const url = `mongodb+srv://usman120ghani:${process.env.dbPASS}@webdev.gohnvuy.mongodb.net/WebDev`;
const url = `mongodb+srv://nawal:nawal123@cluster0.u26mkpt.mongodb.net/?retryWrites=true&w=majority`;

//mongoose.set("strictQuery", true);
// try{
//     mongoose.connect(url).then(()=> {
//     try{
//         console.log("Connected!!!")
//     }
//     catch
//     {
//         console.log("not conneected")

//     }});
// }
// catch{console.log("not connected max")}


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user" ,Router);

console.log("index.js")

mongoose.set("strictQuery", true);
mongoose.connect(url)
.then(()=>{
    app.listen(PORT,()=>{
    console.log(`Server running on port: http://localhost:${PORT}`);
    });
})
.catch((error)=>{console.log(error)})

