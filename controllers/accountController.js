"use strict";

const Controller = require('./controller')

class AccountController extends Controller {

    static create(router, passport) {
        router.get('/login', (req, res, next) => {
            new AccountController().getlogin(req, res, next);
        })

        router.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' })
        )

        router.get('/profile', (req, res, next) => {
            new AccountController().getprofile(req, res, next);
        })

        router.get('/logout', (req, res, next) => {
            req.logout();
            res.redirect('/login');
        })
    }
 
    constructor() {
        super();
    }

    getlogin(req, res, next) {
        this.title = "Login";
        this.render(req, res, 'account/login', { layout: 'layouts/login'});
    }

    postprofile(req, res, next) {
        this.title = "Login";
        this.render(req, res, 'account/login', {});
    }

}

module.exports = AccountController;