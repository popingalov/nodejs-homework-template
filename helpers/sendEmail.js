const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
console.log(SENDGRID_API_KEY);
const sendEmail = async data => {
  const email = { ...data, from: 'popingalov@gmail.com' };
  sgMail.send(email);
};

module.exports = sendEmail;
