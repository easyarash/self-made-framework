const express = require("express");

class Router {
  constructor() {
    this.router = express.Router();
  }

  defineRoute(method, path, middlewares = [], controllerMethod) {
    const [controllerName, methodName] = controllerMethod.split(".");
    const Controller = require(`../controllers/${controllerName}`);
    const controllerInstance = new Controller();

    this.router[method](
      path,
      ...middlewares,
      controllerInstance[methodName].bind(controllerInstance)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Router;
