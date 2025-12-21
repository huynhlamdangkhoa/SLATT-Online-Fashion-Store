import app from "./app.js";
import { appConfig } from "./config/index.js";
import { generateAdminAccount } from "./utils/generateAdminAccount.js";
import { sequelize } from "./config/db/mysql.js";
await sequelize.sync();

const PORT = appConfig.port || 5000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server started on PORT ${PORT}`);
});

// Create admin account
generateAdminAccount();
