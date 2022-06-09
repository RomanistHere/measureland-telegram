### Measureland Telegram feedback bot

This bot is used to anonymously communicate between moderators and users.

#### Reminder

- To update the bot in production, run `npm run build` and copy code inside `dist/worker.js` to Cloduflare online editor. Other ways are way too buggy.
- To connect bot to another domain - remove the existing one https://api.telegram.org/bot<botToken>/setwebhook and then add the domain by running `node app.js` with the correct address

Links to important tools we used:

- [https://github.com/Tsuk1ko/cfworker-middware-telegraf](https://github.com/Tsuk1ko/cfworker-middware-telegraf)
- [https://github.com/telegraf/telegraf/blob/v4/README.md](https://github.com/telegraf/telegraf/blob/v4/README.md)
- [https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers/](https://developers.cloudflare.com/pages/tutorials/build-an-api-with-workers/)
