const http = require("http");

require("dotenv").config({ path: "./config/.env" });
//socket handlers
const SocketIoAdapter = require("./core/socketManager/Socket.io.adapter");
const WebSocketAdapter = require("./core/socketManager/WebSocket.adapter");
const SocketManager = require("./core/socketManager/SocketManger");
const loadSocketHandlers = require("./core/socketManager/loadingSocketHandlers");
//cron handlers
const CronJobManager = require("./core/CronJobManager");

const app = require("./app");
const { sequelize } = require("./config/db");

const server = http.createServer(app);

//socket managing
const useSocketIo = false; // Example condition
const adapter = useSocketIo ? new SocketIoAdapter() : new WebSocketAdapter();

const socketManager = new SocketManager(adapter);

socketManager.initialize(server);

loadSocketHandlers(socketManager);

//cron manager
setTimeout(() => {
  console.log("Simulating job addition...");
  CronJobManager.reloadJobs(); // Reload and reschedule jobs after 1 minute
}, 60000); // Wait 1 minute before reloading jobs

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Auto-sync tables
    console.log("Database connected and synced.");
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();
