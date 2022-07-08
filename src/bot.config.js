const path = require('path')

const config = {
    getFileLink(token, fileId) {
        return `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
    },
    getDownloadLink(token, fileId) {
        return `https://api.telegram.org/file/bot${token}/${fileId}`
    },
    messageUnderVideo(name) {
        return `You can forward this video to ${name}. It will be fun for him or her.`
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
        PRIVACY: 'We don\'t keep or share your personal data, as well as the original voice message and the resulting video with anyone. All /statistics are anonymized. You can see the source code to be sure.',
        ABOUT: `
        Sometimes voice messages can be very boring. Just forward such a message to this bot and it will make a funny video out of it. 
        
Alternatively, you can dictate your message to this bot and forward the result to a friend.

If you like it, you can thank the /author or help /develop this bot.

Other bot /commands`,
        COMMANDS: `
/about - How to use this bot
/author - Author information
/statistics - Bot usage statistics
/privacy - Privacy statement
/develop - Developing the bot
/commands - All bot commands
/donation - Donation information`,
        DEVELOP: 'You can find the source code on [GitHub](https://github.com/smargelov/hedgehog-video). I would also be happy to consider your pull requests and issues there as well.',
        AUTHOR: 'This bot is developed by @smargelov. You can thank him for his work. Or you can make a small /donation to him. \n\nGeneral thanks to Sergey aka Sawa for the idea and Natalia for the motivation.',
        STATISTICS: 'A little bit of this bot\'s statistics:',
        DONATION: `You can make a donation to the /author who is collecting for the bike:
BTC — 17XsYUQDwg7m4EBj41Pa9SeDjjK4U6DwJX
ETH — 0xc5e1cc6d0b0b4eb61b9b84d19680ee85a9101e83
USDT (TRC20) — TJhss3qHfMwMvV6a5r6sMxNnyEFfuzZxVi
If it is more convenient for you to donate through Russian or Georgian banks, text me. I'll give you the details.`
    }
}

module.exports = config
