require("dotenv").config();
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");

async function registerloginUser(req, res) {
  try {
    const data = req.body.data;
    console.log(req.body);
    console.log(data);

    const newUser = await User.findOne({ username: data.username });
    console.log(data.username);
    if (!newUser) {
      const result = await User.create({
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        country: data.country,
        city: data.city,
        role: data.role,
      });
      await Cart.create({
        products: null,
        userID: result._id,
        quantity: 0,
      });

      const token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });

      const refToken = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "8hr",
      });

      console.log(token);
      console.log(refToken);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .cookie("refreshToken", refToken, {
          httpOnly: true,
        })
        .status(200)
        .send({
          message: "user created successfully",
          data: data,
          token,
          refToken,
        });
    } else {
      res.status(401).send("user exists");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
}

async function getProfile(req, res) {
  try {
    console.log("get function");
    // console.log(req)
    const username = req.user.username;

    let user;
    if (username) {
      user = await User.findOne({ username });
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

async function updateUser(req, res) {
  try {
    const username = req.user.username;

    await User.findOneAndUpdate(
      { username: username },
      {
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
        country: req.body.country,
        city: req.body.city,
      }
    );

    const user = await User.find({ username: username });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function login(req, res) {
  try {
    console.log("we are in login");
    const { username, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).send("user does not exist!");
      console.log("user does not exist");
    } else {
      console.log(user);
      //const matchPass=await bcrypt.compare(password,user.password);

      if (!(password == user.password)) {
        res.status(401).send({ message: "invalid password" });
        console.log("Invalid");
      } else {
        const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1hr",
        });

        const refToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "8hr",
        });

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .cookie("refreshToken", refToken, {
            httpOnly: true,
          })
          .status(200)
          .send({
            message: "user logged in sucessfully",
            data: user,
            token,
          });
        console.log("user logged in succesfully");
      }
    }
  } catch (error) {
    console.log(error, "kejfweofh");
  }
}

module.exports = {
  registerloginUser,
  updateUser,
  getProfile,
  login,
};
