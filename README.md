# Telegram-JavaScript-Bot

This repository is a template for creating a Telegram bot in JavaScript. It uses [grammY](https://grammy.dev)

# Features:
- Categories for commands
- Command handler (add commands in [commands](./commands))
- Error handler
- Command aliases (check [8ball](./commands/8ball.js) command, can add multiple aliases)

# Commands
- `/start` - Start the bot

### Categories

#### Utilities
- `/help` - Show help

#### Fun
- `/8ball` - Ask the magic 8-ball a question

# Environment Variables
- `BOT_TOKEN` - Telegram bot token, get it from [@BotFather](https://t.me/BotFather)

# Deploying

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/5lRkWa?referralCode=agam778)

OR 

- Clone this repository
- Install dependencies: `yarn`
- Start the bot: `yarn start`

# License
Telegram-JavaScript-Bot is licensed under the [MIT License](./LICENSE)