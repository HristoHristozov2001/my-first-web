const passport = require('passport');
const { models } = require('../models');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await models.People.findOne({where: {email: email}})
        if(!user){
            return done(null, false, {message: 'Incorrect email.'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, {message: 'Incorrect password'});
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    try {
        const user = await models.People.findByPk(id);
        if (!user) {
            return done(null, false)
        }
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;