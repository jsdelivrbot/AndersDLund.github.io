var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact');
});

router.post('/', function(req, res){
  const output = `
  <p>You have a new contact request</p>
  <h3>Contact Details:</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message:</h3>
  <p>${req.body.message}</p>
  `;

  // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <AndersDouglasLund@gmail.com>', // sender address
      to: 'AndersDouglasLund@gmail.com', // list of receivers
      subject: 'Node contact request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      res.render('contact', {msg: "Thank you, your message has been sent! ✅"});
  });
});
});

module.exports = router;
