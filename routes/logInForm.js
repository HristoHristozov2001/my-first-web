const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { models } = require('../models');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const speakeasy = require('speakeasy');
const { isAuthenticated } = require('../middleware/isAuth');
const axios = require('axios');


router.get('/register', (req, res) => {
   res.render('LogIn/register', { hideNavbar: true });
});

router.post('/register', [
   body('email')
      .isEmail()
      .withMessage('Enter a valid email.')
      .custom(async (email) => {
         const user = await models.People.findOne({ where: { email: email } });
         if (user) {
            throw new Error("Email already exists!");
         }
         return true;
      })
   ,
   body('password')
      .isLength({ min: 8 })
      .withMessage('Password too short.')
      .matches(/\d/)
      .withMessage('Password must contain at least one number')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter.')
      .matches(/[!@#$%^&*(),.?|<>|]/)
      .withMessage('Password must contain at least one special character.'),
   body('confirmPassword')
      .custom(async (confirmPassword, { req }) => {
         if (confirmPassword !== req.body.password) {
            throw new Error("Password confirmation does not match the password.");
         }
         return true;
      }),
   body('phoneNumber')
      .isMobilePhone()
      .withMessage('Enter valid phone number'),
   body('firstName')
      .notEmpty()
      .withMessage('First name is required.'),
   body('lastName')
      .notEmpty()
      .withMessage('Last name is required.'),
   body('gender')
      .notEmpty()
      .withMessage('Gender is required'),
   body('day')
      .isInt({ min: 1, max: 31 })
      .withMessage('Invalid day.'),
   body('month')
      .isInt({ min: 1, max: 12 })
      .withMessage('Invalid month'),
   body('year')
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage('Invalid year')
], async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const { email, password, phoneNumber, firstName, lastName, gender, day, month, year } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const birthDate = new Date(year, month - 1, day);
      const user = await models.People.create({
         email,
         password: hashedPassword,
         phoneNumber,
         firstName,
         lastName,
         gender,
         birthDate
      });

      req.login(user, function (err) {
         if (err) {
            return res.status(500).send('An error occured dured registration. Please try again.');
         }
         res.redirect('/books');
      });

   } catch (error) {
      res.send(error);
   }
});

router.post('/', passport.authenticate('local', {
   //successRedirect: '/books',
   failureRedirect: '/logIn',
   failureFlash: true
}), async (req, res) => {
   const user = req.user;

   const recaptchaResponse = req.body['g-recaptcha-response'];
   const secretKey = process.env.SECRET_RECAPTCHA;
   const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
   
   try {
      const response = await axios.post(verificationURL);
      const googleResponse = response.data;

      if (googleResponse.success) {
         if (user.twoFactorEnabled && user.isVerified) {
            return res.render('2FA/2faForm', { hideNavbar: true });
         } else {
            return res.redirect('/books');
         }
      }else{
         req.flash('error', 'Failed reCAPTCHA verification.');
         return res.redirect('/logIn');
      }

   } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      req.flash('error', 'Error verifying reCAPTCHA.');
      return res.redirect('/logIn');
   }
});

router.get('/2fa', isAuthenticated, (req, res) => {
   res.render('2FA/2faForm');
});

router.post('/2fa', async (req, res) => {
   const user = req.user;
   if (!user) {
      return res.redirect('/logIn');
   }

   const token = req.body.token;
   const secret = user.twoFactorSecret;
   if (!secret) {
      return res.redirect('/logIn');
   }

   const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: token
   });

   if (verified) {
      await models.People.update({
         formConfirmCode: true
      }, {
         where: {
            id: user.id
         }
      });
      res.redirect('/books');
   } else {
      req.flash('error', 'Wrong code.');
      res.render('2FA/2faForm', { messages: req.flash('error'), hideNavbar: true });
   }
});

router.get('/', (req, res) => {
   const messages = req.flash('error') || [];
   const success_msg = req.flash('success_msg') || [];
   res.render('LogIn/logInForm', { messages: messages, hideNavbar: true, success_msg: success_msg });
});

router.get('/forgot-password', (req, res) => {
   const messages = req.flash('error') || [];
   res.render('LogIn/forgetPassword', { hideNavbar: true, messages: messages });
});

router.post('/forgot-password', async (req, res) => {
   const { email } = req.body;

   try {
      const user = await models.People.findOne({
         where: {
            email: email
         }
      });
      if (!user) {
         req.flash('error', 'No account with this email exist.');
         return res.redirect('/forgot-password');
      }

      const token = crypto.randomBytes(20).toString('hex');
      const expires = Date.now() + 3600000;

      await models.ForgetPassword.create({
         resetPasswordToken: token,
         resetPasswordExpires: expires,
         personId: user.id
      });

      const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS
         }
      });

      const mailOptions = {
         to: user.email,
         from: process.env.USER_EMAIL,
         subject: 'Password Reset',
         text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `http://${req.headers.host}/logIn/reset/${token}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      }

      await transporter.sendMail(mailOptions);
      req.flash('success_msg', 'Email has been sent to ' + user.email);
      res.redirect('/logIn');

   } catch (error) {
      req.flash('error', 'Error while trying to reset password.');
      res.redirect('/forgot-passsword');
   }
});

router.get('/reset/:token', async (req, res) => {
   const token = req.params.token;
   try {
      const forgetPass = await models.ForgetPassword.findOne({
         where: {
            resetPasswordToken: token,
            resetPasswordExpires: { [Op.gt]: Date.now() }
         }
      });
      if (!forgetPass) {
         req.flash('error', 'Token has expired or invalid.');
         return res.redirect('/forgot-password');
      }
      res.render('LogIn/resetPassword', { token: req.params.token, hideNavbar: true });
   } catch (error) {
      res.send(error);
   }
});

router.post('/reset/:token', async (req, res) => {
   const { password, confirmPassword } = req.body;
   if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match.');
      return redirect(`/reset/${req.params.token}`);
   }
   try {
      const forgetPassword = await models.ForgetPassword.findOne({
         where: {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { [Op.gt]: Date.now() }
         }
      });
      if (!forgetPassword) {
         req.flash('error', 'Token has expired or invalid.');
         return res.redirect('/forgot-password');
      }
      const user = await models.People.findByPk(forgetPassword.personId);
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      await models.ForgetPassword.destroy({
         where: {
            personId: user.id
         }
      });
      await forgetPassword.save();
      req.flash('success_msg', 'Your passwrod has been updated.');
      res.redirect('/logIn');
   } catch (error) {
      res.send(error);
   }
});

module.exports = router;