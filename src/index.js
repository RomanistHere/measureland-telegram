import { Telegraf, Markup } from 'telegraf';
import { Application, Router } from '@cfworker/web';
import createTelegrafMiddware from 'cfworker-middware-telegraf';

import { botToken, adminID } from './env.js';

const bot = new Telegraf(botToken);

const replyText = {
	'helloAdmin': 'Hi Admin',
	'replyWrong': 'Use reply to answer user'
};

// need to manually change quotes to literal template strings after the build
const firstReplies = {
	'ru': `Привет, здесь мы принимаем жалобы, предложения и любые другие вещи, которыми ты хочешь поделиться. \n\nВсё, что ты напишешь, будет отправлено нашей команде - и, как только кто-то освободится, мы сразу же свяжемся с тобой. \n\nЕсли с момента отправки прошло больше суток, и никто не ответил - смело пиши ещё раз. Мы засекали случаи, когда бот не отправляет сообщение. Альтернативно, вступай в нашу группу и задавай свой вопрос в комментариях: @measureland_ru или в нашем чате: @measureland_chat_ru`,
	'en': `Hi there, here we are listening to your reports, suggestions or anything else that you want to share with us. \n\nEverything you write, will be anonymously forwarded to our team and as soon as someone will have some spare time, we will reply you back. \n\nIf no one replied for some time, write us again. We has detected bot not sending us the messages in the past. Alternatively, ask the questions in our channel: @measureland or group: @measureland_chat`,
	'other': `Hi there, here we are listening to your reports, suggestions or anything else that you want to share with us. \n\nEverything you write, will be anonymously forwarded to our team and as soon as someone will have some spare time, we will reply you back. \n\nUnfortunately, we do not know any other languages, so we will be using a translator to understand what you are about to say, so make your text clear. Thanks :)\n\nIf no one replied for some time, write us again. We has detected bot not sending us the messages in the past. Alternatively, ask the questions in our channel: @measureland or group: @measureland_chat`,
}

const isAdmin = (userId) =>
	userId === adminID;

const forwardToAdmin = ctx => {
	if (isAdmin(ctx.message.from.id)) {
		ctx.reply(replyText.replyWrong);
	} else {
		// ctx.forwardMessage(groupID, ctx.from.id, ctx.message.id);
		// ctx.forwardMessage(adminID, ctx.from.id, ctx.message.id, { disable_notification: true });
		ctx.forwardMessage(adminID, ctx.from.id, ctx.message.id);
	}
};

bot.start(ctx => {
	if (isAdmin(ctx.message.from.id)) {
		ctx.reply(replyText.helloAdmin);
	} else {
		ctx.reply('Language / Язык / Sprache / Idioma / Sprog / 语言 / 言語 ', {
			parse_mode: 'HTML',
			...Markup.inlineKeyboard([
				Markup.button.callback('Русский', 'setLangRU'),
				Markup.button.callback('English', 'setLangEN'),
				Markup.button.callback('Other', 'setLangOther'),
			])
		});
	}
});

bot.action('setLangRU',(ctx) => {
	ctx.reply(firstReplies.ru);
});

bot.action('setLangEN',(ctx) => {
	ctx.reply(firstReplies.en);
});

bot.action('setLangOther',(ctx) => {
	ctx.reply(firstReplies.other);
});

bot.on('message', ctx => {
	console.log(ctx.message);
	if (ctx.message.reply_to_message && ctx.message.reply_to_message.forward_from && isAdmin(ctx.message.from.id)) {
		ctx.telegram.sendCopy(ctx.message.reply_to_message.forward_from.id, ctx.message);
	} else {
		forwardToAdmin(ctx);
	}
});

// do not do `bot.launch()`

const router = new Router();
router.post('/bot', createTelegrafMiddware(bot));
new Application().use(router.middleware).listen();
