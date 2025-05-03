
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());
app.use(express.static('./'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.sitemaat@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;
  
  const mailOptions = {
    from: 'info.sitemaat@gmail.com',
    to: 'info.sitemaat@gmail.com',
    subject: `Nieuw contactformulier van ${name}`,
    text: `
      Naam: ${name}
      Email: ${email}
      Bericht: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
