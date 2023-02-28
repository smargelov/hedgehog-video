const config = require('../src/bot.config.js')
const botStatistic = require('../src/statistics.js')

const commands = (bot) => {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.ABOUT)
    })

    bot.onText(/\/about/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.ABOUT)
    })

    bot.onText(/\/develop/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.DEVELOP, {parse_mode: 'Markdown', disable_web_page_preview: true})
    })

    bot.onText(/\/commands/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.COMMANDS)
    })

    bot.onText(/\/statistics/, (msg) => {
        const statistics = `${config.messages.STATISTICS}
        
Number of bot users: ${botStatistic.usersCount}
Number of videos created: ${botStatistic.videoCount}
Total duration of all videos: ${botStatistic.allTimeString}
        `
        bot.sendMessage(msg.chat.id, statistics)
    })

    bot.onText(/\/author/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.AUTHOR)
    })

    bot.onText(/\/privacy/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.PRIVACY)
    })

    bot.onText(/\/donation/, (msg) => {
        bot.sendMessage(msg.chat.id, config.messages.DONATION)
    })
}

module.exports = commands
