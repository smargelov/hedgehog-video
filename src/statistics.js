const fs = require('fs')
const {join} = require('path')
const config = require('../src/bot.config.js')
const Statistics = require('../src/classes/classes.js')

const statisticsFile = JSON.parse(fs.readFileSync(join(config.paths.ASSETS, 'statistics.txt'), 'utf8'))
const botStatistic = new Statistics(statisticsFile)

module.exports = botStatistic
