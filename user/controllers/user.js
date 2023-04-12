require("dotenv").config();
const User = require("../../models/User");
const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function forgotPassword(req, res) {
  try {
    console.log("we are in forgot password");
    const data = req.body.data;
    console.log(req.body.data);
    let token = req.body.token;
    const user = await User.findOne({ username: data.username });

    if (!user) {
      res.status(400).send("user does not exist!");
      console.log("user does not exist");
    } else {
      console.log(user);

      const email = data.username;
      console.log(email);
      console.log(token);

      const msg = {
        to: email, // Change to your recipient
        from: "usman120ghani@gmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        template_id: "d-c6c30ef7ea2349f185df5cd89151ecbd",
        dynamic_template_data: {
          token: token,
        },
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
          res.status(200).send("email sent");
        })
        .catch((error) => {
          console.log(error);
          res.status(401).send(error);
        });
    }
  } catch (error) {
    console.log(error, "Error Occured");
    res.status(400).send(error);
  }
}
async function verifyPassword(req, res) {
  try {
    console.log("we are in verify password");
    const data = req.body;
    let user, tok;
    console.log(data);

    const authHeader = req.headers["authorization"];
    console.log("authorization");
    console.log(req.headers);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    try {
      user = jwt.verify(data.token, process.env.ACCESS_TOKEN_SECRET);

      tok = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { complete: true });

      console.log(user, tok);
    } catch (err) {
      console.error(err);
    }
    // if (user.user.username === tok.payload.user.username)
    {
      res.status(200).send(user.user.username);
      // } else {
      // res.status(403).send("unauthorized");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function registerloginUser(req, res) {
  try {
    console.log("we are in registerlogin");
    const data = req.body.data;
    console.log(data);

    const newUser = await User.findOne({ username: data.username });
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

      console.log("user created successfully");

      res.status(200).send({
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
  console.log("we are updating user");
  try {
    const username = req.body.emaily;
    const password = req.body.password.password;

    console.log(username, password);

    await User.findOneAndUpdate(
      { username: username },
      {
        password: password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        // role: req.body.role,
        country: req.body.country,
        city: req.body.city,
      }
    );

    console.log("user updated");

    const user = await User.find({ username: username });
    res.status(200).send("user updated");
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
      res.status(400).send({ message: "user does not exist!" });
      console.log("user does not exist");
    } else {
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

        res.status(200).send({
          message: "user logged in sucessfully",
          data: user,
          token,
        });
        console.log("user logged in succesfully");
      }
    }
  } catch (error) {
    console.log(error);
    response.status(400).send(error);
  }
}

module.exports = {
  registerloginUser,
  updateUser,
  getProfile,
  login,
  forgotPassword,
  verifyPassword,
};
