class SocketManager {
  constructor(adapter) {
    this.adapter = adapter;
  }

  initialize(server) {
    this.adapter.initialize(server);
  }

  onConnect(callback) {
    this.adapter.onConnect(callback);
  }

  broadcast(event, data) {
    this.adapter.broadcast(event, data);
  }

  emit(client, event, data) {
    this.adapter.emit(client, event, data);
  }
}

module.exports = SocketManager;
