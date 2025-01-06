const WebSocket = require("ws");
const BaseSocketAdapter = require("./BaseSocketAdapter");

class WebSocketAdapter extends BaseSocketAdapter {
  initialize(server) {
    this.wss = new WebSocket.Server({ server });
  }

  onConnect(callback) {
    this.wss.on("connection", (socket) => callback(socket));
  }

  broadcast(event, data) {
    const message = JSON.stringify({ event, data });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  emit(client, event, data) {
    const message = JSON.stringify({ event, data });
    client.send(message);
  }
}

module.exports = WebSocketAdapter;
