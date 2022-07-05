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
    messageUnderVideo(name) {
        return `You can forward this video to ${name}. It will be fun for him or her.`
    },
    paths: {
        TEMP_VOICE: __dirname + '/assets/tempVoice',
        TEMP_VIDEO: __dirname + '/assets/tempVideo',
        SOURCE_VIDEO: __dirname + '/assets/sourceVideo',
        SOURCE_VIDEO_NAME: 'hedgehog-fog.mp4',
    },
    messages: {
        VIDEO_IS_SOON: 'Video is coming soon...',
        ERROR: 'Something went wrong. Try again later'
    }
}

export default config
