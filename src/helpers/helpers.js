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

const removeFile = (path) => {
    if (!path) { throw new Error('Path is not defined') }
    fs.unlinkSync(path)
}

module.exports = {
    download,
    removeFile
}
