"use strict";

const Controller = require('./controller');

class DashboardController extends Controller {

    static create(router) {
        router.get('/dashboard', (req, res, next) => {
            new DashboardController().index(req, res, next);
        })
    }

    constructor() {
        super();
    }

    index(req, res, next) {
        this.title = "Dashboard";

        this.render(req, res, 'dashboard/index', {
            message: "Bienvenido al primer Controlador de la aplicacion."
        });
    }

}

module.exports = DashboardController;