"use strict";
var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var hbs = require('hbs');
var logger = require("morgan");
var methodOverride = require("method-override");
var errorHandler = require("errorhandler");
var lessMiddleware = require('less-middleware');
var path = require('path');

const Controller  = require('./controllers/index')

class Server {

    static bootstrap() {
        return new Server();
    }

    constructor() {
        this.express = express();

        this.config();

        this.controllers();

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
        hbs.registerPartials( path.join(__dirname, "views","partials") );

        // Configuracion del logger middleware
        this.express.use(logger("dev"));

        // Configuracion de json form parser middleware
        this.express.use(bodyParser.json());

        // Configuracion de query string parser middleware
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));

        // Configuracion de cookie parser middleware
        this.express.use(cookieParser("PALABRAS_SECRETAS"));

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

    controllers() {
        let router = express.Router();

        // Se agregan los modulos de la aplicacion
        Controller.DashboardController.create(router);
        
        this.express.use(router);
    }
}

module.exports = Server