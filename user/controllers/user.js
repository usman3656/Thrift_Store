require("dotenv").config();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function forgotPassword(req, res) {
  try {
    const data = req.body.data;
    console.log(req.body.data);
    let token = req.body.token;
    const user = await User.findOne({ username: data.username });

    if (!user) {
      res.status(400).send("user does not exist!");
    } else {      
      const email = data.username;

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
    const data = req.body;
    let user, tok;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    try {
      user = jwt.verify(data.token, process.env.ACCESS_TOKEN_SECRET);
      tok = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, { complete: true });

    } catch (err) {
      console.error(err);
    }
    {
      res.status(200).send(user.user.username);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function registerloginUser(req, res) {
  try {
    const data = req.body;

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

      const token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });

      const refToken = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "8hr",
      });

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
    const username = req.body.username;

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

async function getByID(req,res){
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.send({ message: 'Success!', user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
}

async function updateUser(req, res) {
  try {
    const username = req.body.emaily;
    const password = req.body.password.password;

    await User.findOneAndUpdate(
      { username: username },
      {
        password: password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
      }
    );

    const user = await User.find({ username: username });
    res.status(200).send("user updated");
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateUserProfile(req,res){
  try {
    const {userID,username,firstName, lastName,phone,address,country,city}=req.body;
    const updatedUser=await User.findOneAndUpdate({_id:userID},{username,firstName, lastName,phone,address,country,city});
    res.send({"message":"update successful",updatedUser});
} catch (error) {
    console.log(error)
}
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).send({ message: "user does not exist!" });
    } else {

      if (!(password == user.password)) {
        res.status(401).send({ message: "invalid password" });
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
  getByID,
  updateUserProfile
};
