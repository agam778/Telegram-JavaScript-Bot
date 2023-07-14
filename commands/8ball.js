const responses = [
  "It is certain.",
  "Without a doubt.",
  "You may rely on it.",
  "Yes, definitely.",
  "It is decidedly so.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Signs point to yes.",
  "Absolutely!",
  "Don't count on it.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "Not likely.",
  "Better not tell you now.",
  "Chances are low.",
  "Unlikely.",
  "No way LMAO.",
  "I highly doubt it.",
];

module.exports = {
  name: "8ball",
  description: "Ask the magic 8ball a question",
  alias: ["eightball"],
  usage: "/8ball <question>",
  example: "/8ball Is this bot awesome?",
  category: "Fun",
  handler: async (ctx) => {
    const { message } = ctx;
    const { text } = message;

    if (!text.substring(text.indexOf(" ") + 1)) {
      await ctx.reply("You need to ask a question!");
      return;
    }

    const response = responses[Math.floor(Math.random() * responses.length)];
    await ctx.reply(response);
  },
};
