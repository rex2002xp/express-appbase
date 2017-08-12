"use strict";
class Controller {
    
    /**
     * Contructor
     * Todos los controladores deberian heredar de esta clase
     * @class Controller
     * @constructor
     */
    constructor() {
        this.applicationName = process.env.APPLICATION_NAME || 'Application Base';
        this.title = "Home";
        this.scripts = [];
    }
    
    /**
     * Permite inyectar scripts a la vista
     * @class Controller
     * @method addScript
     * @param src
     * @return {Controller}
     */
    addScript(src) {
        this.scripts.push(src);
        return this;
    }

    /**
     * Render a page.
     *
     * @class Controller
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    render(req, res, view, options=null) {
        res.locals.BASE_URL = "/";
        res.locals.scripts = this.scripts;
        res.locals.title = this.title;
        res.locals.applicationName = this.applicationName;
        res.render(view, options);
    }
};

module.exports = Controller;

