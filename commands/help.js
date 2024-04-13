import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  name: "help",
  description: "Show a list of commands",
  usage: "/help OR /help <command>",
  example: "/help OR /help aur",
  category: "Utilities",
  handler: async (ctx) => {
    const { message } = ctx;
    const { text } = message;

    if (text.split(" ").length < 2) {
      const commandFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith(".js"));
      const commands = [];
      for (const file of commandFiles) {
        const command = await import(`./${file}`);
        commands.push({
          name: command.default.name,
          description: command.default.description,
          alias: command.default.alias,
          category: command.default.category,
        });
      }

      const categories = [];
      for (const command of commands) {
        if (!categories.includes(command.category)) {
          categories.push(command.category);
        }
      }

      let output =
        "Here's the list of commands you can use, categorized by their category:\n\n";
      for (const category of categories) {
        output += `<b>${category}</b>:\n`;
        for (const command of commands) {
          if (command.category === category) {
            output += `/${command.name}`;
            if (command.alias) {
              output += `, /${command.alias.join(", /")}`;
            }
            output += ` - ${command.description}\n`;
          }
        }
        output += "\n";
      }

      await ctx.reply(output, { parse_mode: "HTML" });
    } else {
      const command = text.substring(text.indexOf(" ") + 1);
      const commandFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith(".js"));

      const commands = [];
      for (const file of commandFiles) {
        const command = await import(`./${file}`);
        commands.push(command);
      }

      const commandDetail = commands.find(
        (cmd) =>
          cmd.default.name === command ||
          (cmd.default.alias && cmd.default.alias.includes(command))
      );

      if (commandDetail) {
        let output = `*Command:* /${commandDetail.default.name}\n`;
        output += `*Description:* ${commandDetail.default.description}\n`;
        output += `*Usage:* \`${commandDetail.default.usage}\`\n`;
        output += `*Example:* \`${commandDetail.default.example}\`\n\n`;
        output += "Run /help to see all the commands";

        await ctx.reply(output, { parse_mode: "MarkdownV2" });
      } else {
        await ctx.reply(
          `Command <code>${command}</code> not found!\nRun /help to see all the commands.`,
          {
            parse_mode: "HTML",
          }
        );
      }
    }
  },
};
