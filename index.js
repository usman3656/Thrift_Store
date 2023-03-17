const express = require("express");
const mongoose = require("mongoose");
const Router = require("./user/routes")
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const app = express();

const url = "mongodb+srv://usman120ghani:Usman123+@webdev.gohnvuy.mongodb.net/WebDev";
try{
    mongoose.connect(url).then(()=> {
    try{
        console.log("Connected!!!")
    }
    catch
    {
        console.log("not conneected")

    }});
}
catch{console.log("not connected max")}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user" ,Router);

console.log("index.js")



app.listen(3000, () => {
  console.log("Server is running at port 3000");
});