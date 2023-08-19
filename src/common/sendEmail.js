import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

export const sendMail = async (obj, template) => {
    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_MAILER,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const data = {
        ...obj.data,
        APP_NAME: process.env.APP_NAME,
    }

    const htmlText = await ejs.renderFile(path.join(`${__dirname}/../../views/${template}/index.ejs`), data);

    let mailOpts = {
        from: `${process.env.MAIL_USERNAME}`,
        to: obj.to,
        subject: obj.subject,
        html: htmlText
    };
    return transporter.sendMail(mailOpts, function (err, response) {
        if (err) {
            console.log(`Mail not sent`,err);
        } else {
            console.log(`Mail sent :- ${obj.to}`);
        }
    });
}







// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/leave_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const UserSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const UserModel = mongoose.model('User', UserSchema);

// const LeaveSchema = new mongoose.Schema({
//   fromDate: Date,
//   toDate: Date,
//   numberOfDays: Number,
//   isUrgent: Boolean,
//   reason: String,
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
// });

// const LeaveModel = mongoose.model('Leave', LeaveSchema);

// app.use(bodyParser.json());

// // Endpoint to register a new user
// app.post('/register', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const newUser = new UserModel({
//       username,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to register user' });
//   }
// });

// // Endpoint for user login
// app.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await UserModel.findOne({ username });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secretKey');
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed' });
//   }
// });

// // Endpoint to apply for leave
// app.post('/apply-leave', async (req, res) => {
//   try {
//     const { fromDate, toDate, numberOfDays, isUrgent, reason } = req.body;
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'secretKey');
//     const userId = decodedToken.userId;

//     const newLeave = new LeaveModel({
//       fromDate,
//       toDate,
//       numberOfDays,
//       isUrgent,
//       reason,
//       user: userId,
//     });
//     const savedLeave = await newLeave.save();
//     res.status(200).json(savedLeave);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to apply for leave' });
//   }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });