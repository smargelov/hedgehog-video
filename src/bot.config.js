import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const config = {
    getFileLink(token, fileId) {
        return `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
    },
    getDownloadLink(token, fileId) {
        return `https://api.telegram.org/file/bot${token}/${fileId}`
    },
    paths: {
        TEMP_VOICE: __dirname + '/assets/tempVoice',
        SOURCE_VIDEO: __dirname + '/assets/sourceVideo',
    },
    messages: {
        VIDEO_IS_SOON: 'Video is soon...',
        ERROR: 'Something went wrong. Try again later',
    }
}

export default config
