import TelegramBot from 'node-telegram-bot-api'
import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
import {download, removeFile} from '../src/helpers/helpers.js'
import path from 'path'
import {config} from '../src/bot.config.js'
import makeTempVideo from '../src/helpers/videoHandler.js'

dotenv.config()
const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, {polling: true})

bot.on('voice', async (msg) => {
    const messageId = msg.message_id
    const isForwarded = !!msg.forward_from
    const voiceMaster = msg.forward_from?.username || null
    const authorName = voiceMaster ? `@${voiceMaster}` : `${msg.forward_from?.first_name} ${msg.forward_from?.last_name}`
    const msgAfterVideo = isForwarded ? config.messageUnderVideo(authorName) : config.messageUnderVideo('your friend')
    const chatId = msg.chat.id
    const fileId = msg.voice.file_id
    try {
        const res = await fetch(config.getFileLink(token, fileId))
        const {result} = await res.json()
        const filePath = result.file_path
        const fileTime = String(msg.voice.duration)

        await bot.sendMessage(chatId, config.messages.VIDEO_IS_SOON)
        const downloadURL = config.getDownloadLink(token, filePath)

        await download(downloadURL, path.join(config.paths.TEMP_VOICE, `${fileId}.oga`), async () => {
                await makeTempVideo(path.join(config.paths.SOURCE_VIDEO, config.paths.SOURCE_VIDEO_NAME), fileId, fileTime)
                await bot.sendVideo(chatId, path.join(config.paths.TEMP_VIDEO, `${fileId}.mp4`), {
                    reply_to_message_id: messageId
                })
                await bot.sendMessage(chatId, msgAfterVideo)
                await removeFile(path.join(config.paths.TEMP_VOICE, `${fileId}.oga`))
                await removeFile(path.join(config.paths.TEMP_VIDEO, `${fileId}.mp4`))
            }
        )
    } catch (e) {
        bot.sendMessage(chatId, config.messages.ERROR)
    }
})
