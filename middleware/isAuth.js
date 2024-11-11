module.exports = {
    isAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error', 'You need to be loged in to be able to access this page.');
        res.redirect('/logIn');
    },
    isAdmin: (req, res, next) => {
        if(req.isAuthenticated() && req.user.role == 'admin'){
            return next();
        }
        req.flash('error', 'You do not have permission to access this page.');
        res.redirect('/books');
    }
}