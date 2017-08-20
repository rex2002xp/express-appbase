"use strict";

const Controller = require('./controller')
const PassportMiddleware = require('../middlewares').PassportMiddleware

class DashboardController extends Controller {

    static create(router) {
        router.get('/', new PassportMiddleware().isAuthenticated, (req, res, next) => {
            new DashboardController().index(req, res, next);
        })
        router.get('/dashboard', new PassportMiddleware().isAuthenticated, (req, res, next) => {
            new DashboardController().dashboard(req, res, next);
        })
    }

    constructor() {
        super();
    }

    index(req, res, next) {
        res.redirect('/dashboard');
    }

    dashboard(req, res, next) {
        this.title = "Dashboard";
        this.render(req, res, 'dashboard/index', {
            message: "Bienvenido al primer Controlador de la aplicacion."
        });

    }

}

module.exports = DashboardController;