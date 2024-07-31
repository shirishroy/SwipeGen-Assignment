const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3007;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS);


app.get('/', (req, res) => {
    res.send('Welcome to the Contact Form API!');
  });
  
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
          
        }
      });
    
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'shirishk2003@gmail.com', // Administrator email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
      });
    });

   

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });


