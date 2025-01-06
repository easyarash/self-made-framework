const fs = require("fs");
const path = require("path");

const loadSocketHandlers = (socketManager) => {
  const socketsDir = path.join(__dirname, "..", "..", "sockets");

  fs.readdirSync(socketsDir).forEach((file) => {
    const filePath = path.join(socketsDir, file);

    if (path.extname(file) === ".js") {
      const registerSocket = require(filePath);

      socketManager.onConnect((socket) => {
        registerSocket(socket, socketManager);
      });
    }
  });
};

module.exports = loadSocketHandlers;
