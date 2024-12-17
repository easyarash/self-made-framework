const Router = require("../core/Router");

const router = new Router();

router.defineRoute("post", "/addUser", [], "UserController.addUser");

module.exports = router.getRouter();
