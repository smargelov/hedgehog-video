const md5 = require('md5')
const fs = require('fs')
const {join} = require('path')
const config = require('../../src/bot.config.js')

class Statistics {
    constructor(data) {
        this.users = data.users
        this.videoCount = data.videos
        this.allTimeSeconds = data.allTime
    }

    get allTimeString() {
        const seconds = this.allTimeSeconds
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds - hours * 3600) / 60)
        const secondsLeft = seconds - hours * 3600 - minutes * 60
        return `${hours}:${minutes}:${secondsLeft}`
    }

    addUniqUser(userId) {
        const userHash = md5(userId)
        if (!this.users.includes(userHash)) {
            this.users.push(userHash)
        }
    }

    get usersCount() {
        return this.users.length
    }

    videoCountIncrement(num = 1) {
        this.videoCount += num
    }

    setAllTimeSeconds(seconds) {
        this.allTimeSeconds += Number(seconds)
    }

    getNewStatisticObject() {
        return {
            users: this.users,
            allTime: this.allTimeSeconds,
            videos: this.videoCount
        }
    }

    getJsonFromStatistic() {
        return JSON.stringify(this.getNewStatisticObject())
    }

    writeToFile() {
        fs.writeFileSync(join(config.paths.ASSETS, 'statistics.txt'), this.getJsonFromStatistic())
    }
}

module.exports = { Statistics }
