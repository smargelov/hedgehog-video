const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()
const {download, removeFile} = require('../src/helpers/helpers.js')
const path = require('path')
const config = require('../src/bot.config.js')
const makeTempVideo = require('../src/helpers/videoHandler.js')
const commands = require('../src/commands.js')
const botStatistic = require('../src/statistics.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

const token = process.env.TELEGRAM_TOKEN
const bot = new TelegramBot(token, {polling: true})

commands(bot)
bot.onText(/\/givememd5listusers/, (msg) => {
    const chatId = msg.chat.id
    const usersString = JSON.stringify(botStatistic.users)
    bot.sendMessage(chatId, usersString)
})

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
                await botStatistic.setAllTimeSeconds(fileTime)
                await botStatistic.addUniqUser(msg.from.id)
                await botStatistic.videoCountIncrement()
                await botStatistic.writeToFile()
            }
        )
    } catch (e) {
        console.log(e)
        bot.sendMessage(chatId, config.messages.ERROR)
    }
})
