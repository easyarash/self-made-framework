require("dotenv").config({ path: "./config/.env" });

const app = require("./app");
const { sequelize } = require("./config/db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Auto-sync tables
    console.log("Database connected and synced.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
})();
