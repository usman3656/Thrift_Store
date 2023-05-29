const express = require("express");
const mongoose = require("mongoose");
const Router = require("./user/routes");
const Routeradmin = require("./admin/routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const PORT = process.env.PORT;

//const url = `mongodb+srv://usman120ghani:${process.env.dbPASS}@webdev.gohnvuy.mongodb.net/WebDev`;
const url = `mongodb+srv://nawal:${process.env.dbPass}@cluster0.u26mkpt.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", Router);
app.use("/admin", Routeradmin);

console.log("index.js");

mongoose.set("strictQuery", true);
mongoose
  .connect(url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
