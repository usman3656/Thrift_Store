require("dotenv").config();
const User = require("../../models/User");
// const Cart = require("../../models/Cart");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
let emailauth;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
// }

async function forgotPassword(req, res) {
  try {
    emailauth = { emaily: "", urlElement: "" };
    console.log("we are in forgot password");
    const data = req.body.data;
    console.log(req.body.data);
    const token = req.body.token;
    const user = await User.findOne({ username: data.username });

    if (!user) {
      res.status(400).send("user does not exist!");
      console.log("user does not exist");
    } else {
      console.log(user);

      const email = data.username;

      // const accountSid = process.env.accountSid;
      // const authToken = process.env.accountToken;
      // const verifySid = process.env.verifySid;;

      // const twilioClient = require("twilio")(accountSid, authToken);

      // twilioClient.verify.v2
      //   .services(verifySid) //Put the Verification service SID here
      //   .update({ customCodeEnabled: true });

      // twilioClient.verify.v2
      //   .services(verifySid)
      //   .verifications.create({ customCode: "123456", to: email, channel: "email", sendDigits: "13243" })
      //   .then((verification) => {
      //     console.log(verification.sid);
      //     console.log(verification.toJSON(verification));
      //   });

      // emailauth.urlElement = getRandomIntInclusive(1000, 10000000).toString(10);
      // emailauth.emaily = email;
      // console.log(emailauth);

      const msg = {
        to: email, // Change to your recipient
        from: "usman120ghani@gmail.com", // Change to your verified sender
        subject: "Sending with SendGrid is Fun",
        template_id: "d-c6c30ef7ea2349f185df5cd89151ecbd",
        dynamic_template_data: {
          token: token,
          // email: email,
          // code: emailauth.urlElement,
        },
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
          res
            // .cookie("emailauth", emailauth)
            .status(200)
            .send("email sent");
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
    // console.log(req.body);
    console.log(data);
    // const emailauth = req.cookie.emailauth;
    // console.log(emailauth);

    if (data.urlElement === emailauth.urlElement && data.emaily === emailauth.emaily) {
      res.status(200).send(data.emaily);
    } else {
      res.status(403).send("unauthorized");
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = process.env.accountSid;
// const authToken = process.env.accountToken;
// const verifySid = process.env.verifySid;;

// const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .fetch()
//   // .verifications.update({ status: "approved" })
//   .then((verification) => console.log(verification.status));

// const user = await User.findOne({ username: data.username });

// if (!user) {
//   res.status(400).send("user does not exist!");
//   console.log("user does not exist");
// } else {
//   console.log(user);

//   const email = data.username;

// const accountSid = process.env.accountSid;
// const authToken = process.env.accountToken;
// const verifySid = process.env.verifySid;;

//   const twilioClient = require("twilio")(accountSid, authToken);

//   twilioClient.verify.v2
//     .services(verifySid) //Put the Verification service SID here
//     .verifications.create({ to: email, channel: "email" })
//     .then((verification) => {
//       console.log(verification.sid);
//       console.log(verification.toJSON(verification));
//     });

//   res.status(200).send("email sent successfully");

// const msg = {
//   to: email, // Change to your recipient
//   from: "usman120ghani@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<html><p>iuefgquefb</p></html>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//     res.status(200).send("email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status(401).send(error);
//   });

async function registerloginUser(req, res) {
  try {
    const data = req.body;
    // console.log(req.body);
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

      const token = jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1hr",
      });

      const refToken = jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "8hr",
      });

      console.log(token);
      console.log(refToken);
      res
        // .cookie("access_token", token, {
        //   httpOnly: true,
        // })
        // .cookie("refreshToken", refToken, {
        //   httpOnly: true,
        // })
        .status(200)
        .send({
          message: "user created successfully",
          user: result,
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
  console.log("we are updating user");
  try {
    console.log(req.body);
    // const username = req.user.username;

    // console.log(username);

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

    console.log("updated");

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
  forgotPassword,
  verifyPassword,
};
