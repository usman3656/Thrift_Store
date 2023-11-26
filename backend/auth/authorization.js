//const userAuth = require('../models/User');
const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.sendStatus(401);
    } else {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (!data) {
        return res.sendStatus(401);
      } else {
        return next();
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400).send({ message: "Invalid Token" });
  }
}

async function refreshToken(req, res) {}

async function resetAccessToken(req, res) {
  try {

    if (!refreshToken) {
      res.send("Invalid Refresh token or Token expired");
    }
    const verifyToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!verifyToken) {
      res.send("Token donot match");
    }

    if (user) {
      const accessToken = await jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });
      const refToken = await jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30days",
      });

      res
        // .cookie("access_token", accessToken, {
        //   httpOnly: true,
        // })
        // .cookie("refreshToken", refToken, {
        //   httpOnly: true,
        // })
        .status(200)
        .send("Access token updated succesfully");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  authenticateToken,
  resetAccessToken,
};
