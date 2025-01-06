class BaseSocketAdapter {
  constructor() {
    if (new.target === BaseSocketAdapter) {
      throw new Error("Cannot instantiate BaseSocketAdapter directly");
    }
  }

  initialize(server) {
    throw new Error("Method 'initialize' must be implemented.");
  }

  onConnect(callback) {
    throw new Error("Method 'onConnect' must be implemented.");
  }

  broadcast(event, data) {
    throw new Error("Method 'broadcast' must be implemented.");
  }

  emit(client, event, data) {
    throw new Error("Method 'emit' must be implemented.");
  }
}

module.exports = BaseSocketAdapter;
