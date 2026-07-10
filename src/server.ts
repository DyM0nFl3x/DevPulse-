import app from "./app";
import styleConsole from "./utility/style.console";
import config from "./config";
import { initDB } from "./db";

app.listen(config.port, async () => {
  const dbConnected = await initDB();

  styleConsole({
    server: true,
    database: dbConnected,
    port: Number(config.port),
    title: "DevPulse Backend",
    titleColor: "red",
  });
});
