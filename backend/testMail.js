import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com",
    pass: "YOUR_APP_PASSWORD",
  },
});

transporter.sendMail({
  from: "YOUR_EMAIL@gmail.com",
  to: "YOUR_EMAIL@gmail.com",
  subject: "Test Mail",
  text: "Hello world",
})
.then(() => console.log("Email sent successfully"))
.catch(err => console.error(err));