import TelegramBot from 'node-telegram-bot-api'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import { download } from '../src/helpers/helpers.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const token = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(token, {polling: true})

bot.on('message', async (msg) => {
	const chatId = msg.chat.id
	if (msg.voice) {
		const fileId = msg.voice.file_id
		const res = await fetch(
			`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
		)
		const res2 = await res.json()
		const filePath = res2.result.file_path

		const downloadURL =
			`https://api.telegram.org/file/bot${token}/${filePath}`

		download(downloadURL, path.join(__dirname  + '/assets/tempVoice', `${fileId}.ogg`), () =>
			console.log('Done!')
		);
	}

	bot.sendMessage(chatId, 'Произвольный ответ')
});
