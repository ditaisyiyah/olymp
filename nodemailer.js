var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'ditahacktiv@gmail.com',
    pass: 'hacktivate',
  },
});
transporter.verify().then(console.log).catch(console.error);

module.exports = transporter