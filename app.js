import { Telegraf } from 'telegraf';

import { botToken, domain } from './src/env.js';

const bot = new Telegraf(botToken);

(async () => {
	// set webhook
	await bot.telegram.setWebhook(domain);

	// delete webhook
	// await bot.telegram.deleteWebhook();

	// get webhook info
	await bot.telegram.getWebhookInfo().then(console.log);
})();
