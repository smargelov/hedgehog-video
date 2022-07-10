const config = require('../../src/bot.config.js')
const ffmpeg = require('fluent-ffmpeg')
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')

const ffmpegPath = ffmpegInstaller.path
ffmpeg.setFfmpegPath(ffmpegPath)

/**
 * Returns a promise that resolves to a video file with the given duration.
 * @param {number} time
 * @returns {Promise<number>}
 */
const getLoopTimes = async (time) => {
    const sourceVideoDuration = 69
    return Math.ceil(time / sourceVideoDuration)
}

/**
 * Make temp video from source video and audio
 * @param {string} filePath
 * @param {string} fileName
 * @param {string} fileTime
 * @returns {Promise<void>}
 */
const makeTempVideo = async (filePath, fileName, fileTime) => {
    const loopTimes = await getLoopTimes(fileTime)
    await new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .inputOptions(`-stream_loop ${loopTimes}`)
            .setDuration(fileTime)
            .addInput(config.paths.TEMP_VOICE + '/' + fileName + '.oga')
            .output(config.paths.TEMP_VIDEO + '/' + fileName + '.mp4')
            .on('end', (err) => {
                if (!err) {
                    resolve()
                }
            })
            .on('error', (err) => {
                reject(err)
            }).run()

    })
}

module.exports = makeTempVideo
