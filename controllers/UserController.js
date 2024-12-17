const UserService = require("../services/UserService");
const asyncWrapper = require("../core/AsyncWrapper");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  addUser = asyncWrapper(async (req, res) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json({
      status: "success",
      data: user,
    });
  });
}

module.exports = UserController;
