"use strict";
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require('express-session')
const hbs = require('hbs');
const logger = require("morgan");
const methodOverride = require("method-override");
const errorHandler = require("errorhandler");
const lessMiddleware = require('less-middleware');
const path = require('path');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const helpers = require('./helpers')

const Controller = require('./controllers/index')
const db = require('./models');

class Server {

    static bootstrap() {
        return new Server();
    }

    constructor() {
        this.express = express()
        this.config()
        this.controllers()
        this.api();
    }

    api() {
    }

    config() {
        dotenv.load();

        // Middleware para LESS
        this.express.use(lessMiddleware(path.join(__dirname, 'public')));

        // Agrega las ruta estatica
        this.express.use(express.static(path.join(__dirname, "public")));

        // Configuracion del engine template
        this.express.set("views", path.join(__dirname, "views"));
        this.express.set("view engine", "hbs"); // extension del archivo
        hbs.registerPartials(path.join(__dirname, "views", "layouts/partials"));

        // Configuracion del logger middleware
        this.express.use(logger("dev"));

        // Configuracion de json form parser middleware
        this.express.use(bodyParser.json());

        // Configuracion de query string parser middleware
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

        this.express.use(session({ secret: process.env.SESSION_SECRET, key: 'user', resave: true, saveUninitialized: false, cookie: { maxAge: 300000, secure: false } }));

        // Passport
        this.express.use(passport.initialize())
        this.express.use(passport.session())

        this.passportLocal()

        // Configuracion de override middlware
        this.express.use(methodOverride());

        // catch 404 and forward to error handler
        this.express.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.express.use(errorHandler());

    }

    passportLocal() {

        passport.serializeUser((user, done) => {
            done(null, user.id);
        })

        passport.deserializeUser((user_id, done) => {
            db.user.findById(user_id).then((user) => {
                user.password = null
                done(null, user)
            });
        })

        passport.use(
            new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
                db.user.findOne({ where: { email: email } }).then(user => {
                    if (!user) {
                        return done(null, false, { message: `Este email: ${email} no esta registrado ` });
                    } else {
                        if (helpers.comparePass(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'El password no es valido.' });
                        }
                    }
                })
            })
        )

    }

    controllers() {
        let router = express.Router();

        // Se agregan los modulos de la aplicacion
        Controller.DashboardController.create(router);
        Controller.AccountController.create(router, passport);

        this.express.use(router);
    }
}

module.exports = Server