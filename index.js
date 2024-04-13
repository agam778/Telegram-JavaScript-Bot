import { Bot, GrammyError, HttpError } from "grammy";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import fs from "fs";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (fs.existsSync(".env")) {
  config();
}

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
  throw new Error("BOT_TOKEN is not set in environment variables! Exiting...");
}

async function start() {
  const bot = new Bot(botToken);
  bot.use(autoQuote());

  const commandFilesDir = path.resolve(__dirname, "commands");
  const commandFiles = fs
    .readdirSync(commandFilesDir)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = await import(path.join(commandFilesDir, file));
    console.log(`Registering command ${command.default.name}...`);
    bot.command(command.default.name, command.default.handler);

    if (command.default.alias) {
      for (const alias of command.default.alias) {
        console.log(
          `Registering alias ${alias} for command ${command.default.name}...`
        );
        bot.command(alias, command.default.handler);
      }
    }
  }

  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

  process.on("uncaughtException", (err) => {
    console.error(err);
  });

  process.on("unhandledRejection", (err) => {
    console.error(err);
  });

  process.on("SIGINT", () => {
    console.log("Stopping...");
    bot.stop();
    process.exit(0);
  });

  console.log("Starting the bot...");
  await bot.start();
}

start().catch((error) => {
  console.error("Error occurred during bot startup:", error);
  process.exit(1);
});
