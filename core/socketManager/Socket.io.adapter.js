const { Server } = require("socket.io");
const BaseSocketAdapter = require("./BaseSocketAdapter");

class SocketIoAdapter extends BaseSocketAdapter {
  initialize(server) {
    this.io = new Server(server);
  }

  onConnect(callback) {
    this.io.on("connection", (socket) => callback(socket));
  }

  broadcast(event, data) {
    this.io.emit(event, data);
  }

  emit(client, event, data) {
    client.emit(event, data);
  }
}

module.exports = SocketIoAdapter;
