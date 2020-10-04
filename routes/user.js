const router = require("express").Router();
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");
var _ = require("lodash");

router.post("/register", (req, res) => {
  var body = _.pick(req.body, ["email", "password", "name", "person_id", "type"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res
        .header("x-auth", token)
        .status(200)
        .send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.delete("/me/token", authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

router.get("/me", authenticate, (req, res) => {
  res.send(req.user);
});

router.post("/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.send({ user, "x-auth": token }); //.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

router.post("/feedback", async (req, res) => {

  console.log(req.body);
  try {
    const nodemailer = require("nodemailer");
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      // port: 587,
      // secure: false, // true for 465, false for other ports
      auth: {
        user: "voidcoder1@gmail.com", // generated ethereal user
        pass: "yse@21012002", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Test" <souravmangla0@gmail.com>', // sender address
      to: "souravmangla0@gmail.com, mangla.sourav96@gmail.com", // list of receivers
      subject: "Test", // Subject line
      text: "Feedback From: " + req.body.feedback, // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    // const userData = await User.findById(req.body.sender_id);
    // console.log("user Data", userData)
    // userData.sendFeedback.push(req.body);
    // userData.save();

    // const receiverData = await User.find({ email: req.body.receiver_email });
    // console.log(receiverData)
    // receiverData[0].receivedFeedback.push(req.body);
    // receiverData[0].save();
    // gmail

  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
