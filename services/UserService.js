const UserRepository = require("../repositories/UserRepository");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    return await this.userRepository.create(data);
  }
}

module.exports = UserService;
