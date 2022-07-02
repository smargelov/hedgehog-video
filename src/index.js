import TelegramBot from 'node-telegram-bot-api'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import {download} from '../src/helpers/helpers.js'
import path from 'path'
import {config} from '../src/bot.config.js'

dotenv.config()
const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, {polling: true})

bot.on('bot_message', async (msg) => {
    console.log(msg)
})

bot.on('voice', async (msg) => {
    const chatId = msg.chat.id
    try {
        const fileId = msg.voice.file_id
        const res = await fetch(config.getFileLink(token, fileId))
        const {result} = await res.json()
        const filePath = result.file_path

        const downloadURL = config.getDownloadLink(token, filePath)

        await download(downloadURL, path.join(config.paths.TEMP_VOICE, `${fileId}.oga`), () =>
            bot.sendMessage(chatId, config.messages.VIDEO_IS_SOON)
        )
    } catch (e) {
        bot.sendMessage(chatId, config.messages.ERROR)
    } finally {
        // bot.deleteMessage(chatId, msg.message_id)
        // bot.sendVideo(chatId, path.join(config.paths.SOURCE_VIDEO, 'hedgehog-fog.mp4'))
    }
})
