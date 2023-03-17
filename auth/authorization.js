const userAuth = require('../user/model');
const jwt = require('jsonwebtoken');


async function authenticateToken(req, res, next) {
    try{
      const token = req.cookies.access_token;
      if (!token) {
        return res.sendStatus(401);
    
      console.log(req.cookies);
      console.log('going');
    }else {
      if (!(await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET))){
        return res.sendStatus(401)
      }
      else{
        next()
      }
    }
  }
  catch(err){
    console.log(err);
    res.sendStatus(400).send({message : "Invalid Token"})
  }
  }

  async function resetAccessToken(req, res) {
    try {
      // console.log(req.cookies);
      const { refreshToken} = req.cookies;
      // console.log(refreshToken);
  
      if (!refreshToken) {
        res.send("Invalid Refresh token or Token expired");
      }
      const verifyToken = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (!verifyToken) {
        res.send("Token donot match");
      }
  
      if (user) {
        const accessToken = await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1hr",
        });
        const refToken = await jwt.sign(
          { user },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "30days",
          }
        );
  
        res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        }).cookie("refreshToken", refToken, {
          httpOnly:true
        })
        .status(200)
          .send("Access token updated succesfully");
      }
    } catch (error) {
      throw error;
    }
  }

  module.exports={
    authenticateToken,
    resetAccessToken
  };