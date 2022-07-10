const request = require('request')
const fs = require('fs')

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        if (err && res.statusCode !== 200) {
            throw new Error('Error downloading file')
        }
        request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })
}

const removeFile = async (path) => {
    try {
        await fs.unlink(path, (err) => {
            if (err) throw err
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    download,
    removeFile
}
