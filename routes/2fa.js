const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/isAuth');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const { models } = require('../models');

router.get('/', isAuthenticated, async (req, res) => {
    const user = req.user;

    if (!user.twoFactorEnabled) {
        res.render('2FA/2fa', { user: user });
    } else if (user.twoFactorEnabled && !user.isVerified) {
        const secret = user.twoFactorSecret;
        const otpauth_url = `otpauth://totp/MyApp%20(2FA)?secret=${secret}&issuer=MyApp`;

        qrcode.toDataURL(otpauth_url, async (err, data_url) => {
            if (err) {
                return res.status(500).send('Грешка при генериране на QR код.');
            }
            res.render('2FA/2fa', { user: user, qrcode: data_url });
        });
    } else {
        res.render('2FA/2fa', { user: user });
    }
});



router.post('/activate', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user.id;
        const secret = speakeasy.generateSecret({ name: 'MyApp (2FA)' });

        await models.People.update({
            twoFactorEnabled: true,
            twoFactorSecret: secret.base32,
        }, {
            where: {
                id: userId
            }
        });

        res.redirect('/2fa');
    } catch (error) {
        res.status(500).send('An error occurred while activating 2FA.');
    }
});


router.post('/deactivate',isAuthenticated, (req, res) =>{
    const userId = req.user.id;
    models.People.update({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        isVerified: false
    }, {
        where: {
            id: userId
        }
    });
    res.redirect('/2fa');
});

router.post('/verify', isAuthenticated, async (req, res) => {
    const user = req.user;
    const token = req.body.token;
    const secret = user.twoFactorSecret;

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: token
    });

    if (verified) {
        await models.People.update({
            isVerified: true
        }, {
            where: {
                id: user.id
            }
        });
        res.render('2FA/isVerified');
    } else {
        res.send('Грешен код. Моля, опитайте отново.');
    }
});

module.exports = router;