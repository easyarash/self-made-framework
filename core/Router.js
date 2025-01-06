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
    const defaultMiddleware = (req, res, next) => next();

    group.middleware = (middleware) => {
      group.middlewares.push(middleware);

      for (const { method, path, middlewares = [], controllerMethod } of routes) {
        this.defineRoute(
          method,
          `${prefix}${path}`,
          group.middlewares.length > 0 || middlewares.length > 0
            ? [...group.middlewares, ...middlewares]
            : [defaultMiddleware], // Wrap defaultMiddleware in an array
          controllerMethod
        );
      }
      return group;
    };

    // Automatically define routes without needing explicit middleware calls
    for (const { method, path, middlewares = [], controllerMethod } of routes) {
      this.defineRoute(
        method,
        `${prefix}${path}`,
        middlewares.length > 0 ? middlewares : [defaultMiddleware], // Wrap defaultMiddleware in an array
        controllerMethod
      );
    }

    return group;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = Router;
