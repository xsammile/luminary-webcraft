const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // make sure your HTML is in /public

app.post('/book', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'your_email@gmail.com',
    subject: 'New Consultation Booking',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send('Email sending failed.');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Message sent successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
