export default {
  name: "start",
  description: "Start the bot",
  usage: "/start",
  example: "/start",
  category: "Utilities",
  handler: async (ctx) => {
    await ctx.reply(
      "Hello!\n\n" + "Run the /help command to see what I can do!"
    );
  },
};
