require('dotenv').config();
const userModel = require("./model");
const jwt = require('jsonwebtoken');

async function registerloginUser (req, res)  {
  try{
    const {username,password,firstName,lastName,Phone,Address, Country,City,role} = req.body;
    console.log(req.body);

    const newUser = await userModel.findOne({username});
    if(!newUser){
      const result = await userModel.create({
        username,
        password,
        firstName,
        lastName,
        Phone,
        Address,
        Country,
        City,
        role
      })

      const token = jwt.sign({result}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr"
      })

      const refToken = jwt.sign({result}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "8hr"});
      console.log(token);
      console.log(refToken);
      res
      .cookie("access_token", token, {
        httpOnly: true,
      }).cookie("refreshToken", refToken, {
        httpOnly:true
      })
      .status(200)
      .send({
        message: "user created successfully",
        data: result,
      });
    }
    else{
      res.send("user exists");
    }
  }
    catch (error){
    console.log(error)
      
    }
  };

 async function getUser (req,res) {

try{
  console.log("get function")
  const { username, firstName, lastName } = req.query;
  console.log(req.params) 
   console.log("get function")

   let user;

   if (firstName) {
    console.log(firstName);
     user = await userModel.findOne({ firstName });
   } else if (lastName) {
     user = await userModel.findOne({ lastName });
   } else if (username) {
     user = await userModel.findOne({ username });
   }

   if (!user) {
     res.send("Invalid details");
   } else {
     res.send({
       message: "successfully fetched data",
       data: { user },
     });
   }
 } catch (error) {
   console.log(error);
 }
}

async function updateUser(req , res){
    try {

      await userModel.findOneAndUpdate({username: req.body.username}, {password:req.body.password},
        {firstName: req.body.firstName},{lastName:req.body.lastName},{Phone : req.body.Phone},
        {Address: req.body.Address},{role: req.body.role},{Country: req.body.Country},{City: req.body.City});
      
        const user = await userModel.find({username:req.body.username})
      res.send(user);
    } catch (error) {
      res.status(500).send(error);
    }
};

async function deleteUser (req, res){
    try {
      const user = await userModel.deleteOne({username: req.body.username});
      res.send(user);
      cookies.set('testtoken', {maxAge: 0});
    } catch (error) {
      res.status(500).send(error);
    }
};


module.exports = {
    registerloginUser,
    updateUser,
    deleteUser,
    getUser,
};