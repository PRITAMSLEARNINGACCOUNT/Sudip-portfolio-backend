const express = require("express");
const serverless = require("serverless-http");
const app = express();
const nodemailer = require("nodemailer");
const CORS = require("cors");
require("dotenv").config();
const router = express.Router();
//MiddleWares
app.use(CORS());
app.use(express.json());
app.use("/", router);
//Endpoints
router.post("/submit", (request, response) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    to: process.env.EMAIL,
    subject: request.body.name,
    text: `My Email Is :- ${request.body.email} \n My Message Is "${request.body.message}"`,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      response.status(501).send(error);
    } else {
      response.status(200).send("Email Sent Successfully");
    }
  });
});

module.exports.handler = serverless(app);
