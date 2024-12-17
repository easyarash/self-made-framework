const BaseRepository = require("./BaseRepository");
const User = require("../models/UserModel");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
