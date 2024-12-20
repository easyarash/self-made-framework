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

  setGroupRoute(prefix, routes) {
    const group = { prefix, routes, middlewares: [] };

    group.middleware = (middleware) => {
      group.middlewares.push(middleware);
      for (const { method, path, middlewares, controllerMethod } of routes) {
        this.defineRoute(
          method,
          `${prefix}${path}`,
          [...group.middlewares, ...middlewares],
          controllerMethod
        );
      }
      return group;
    };
    return group;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Router;
