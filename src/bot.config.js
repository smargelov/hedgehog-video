const path = require('path')

const config = {
    getFileLink(token, fileId) {
        return `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
    },
    getDownloadLink(token, fileId) {
        return `https://api.telegram.org/file/bot${token}/${fileId}`
    },
    messageUnderVideo(name) {
        return `Feel free to share this video with ${name}. It's sure to provide them with some amusement.`
    },
    paths: {
        ASSETS: path.join(__dirname, '/assets'),
        TEMP_VOICE: path.join(__dirname, '/assets/tempVoice'),
        TEMP_VIDEO: path.join(__dirname, '/assets/tempVideo'),
        SOURCE_VIDEO: path.join(__dirname, '/assets/sourceVideo'),
        SOURCE_VIDEO_NAME: 'hedgehog-fog.mp4'
    },
    messages: {
        VIDEO_IS_SOON: 'Video is coming soon...',
        ERROR: 'Something went wrong. Try again later',
        PRIVACY: 'We do not retain or distribute any of your personal information, nor do we store the original voice message or resulting video. Additionally, all /statistics are rendered anonymous. You are welcome to review the source code for further assurance.',
        ABOUT: `
        Occasionally, voice messages may come across as dull. However, you can simply forward such a message to this bot, and it will transform it into a humorous video.

Alternatively, you can dictate your message to the bot, and then share the resulting video with your friend.

If you find this bot useful, you may express your gratitude to the /author or offer assistance with the /development of this bot.

There are also other /commands available for this bot.`,
        COMMANDS: `
/about - How to use this bot
/author - Author information
/statistics - Bot usage statistics
/privacy - Privacy statement
/develop - Developing the bot
/commands - All bot commands
/donation - Donation information`,
        DEVELOP: 'The source code for this project is available on [GitHub](https://github.com/smargelov/hedgehog-video). We welcome contributions from the community, so please feel free to submit your pull requests and issues on the platform. We would be delighted to review and consider them.',
        AUTHOR: 'This bot was created by @smargelov. If you find it helpful, you may express your appreciation to him or make a small /donation.\n\nSpecial thanks are owed to Sergey, also known as Sawa, for providing the initial concept, and to Natalia for her encouragement and motivation.',
        STATISTICS: 'Here are some statistics related to this bot:',
        DONATION: `If you would like to contribute to the author, who is currently saving up for a bike, you may do so by making a donation using any of the following cryptocurrency addresses:
BTC — 17XsYUQDwg7m4EBj41Pa9SeDjjK4U6DwJX
ETH — 0xc5e1cc6d0b0b4eb61b9b84d19680ee85a9101e83
USDT (TRC20) — TJhss3qHfMwMvV6a5r6sMxNnyEFfuzZxVi
Alternatively, if it is more convenient for you to donate through Russian or Georgian banks, please feel free to contact us via message, and we will be happy to provide you with the necessary details.`
    }
}

module.exports = config
