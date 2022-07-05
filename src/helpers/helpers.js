import request from 'request'
import fs from 'fs'

export const download = (url, path, callback) => {
	request.head(url, (err, res, body) => {
		request(url).pipe(fs.createWriteStream(path)).on('close', callback);
	})
}

export const removeFile = async (path) => {
	try	{
		await fs.unlink(path, (err) => {
			if (err) throw err
		})
	}
	catch (e) {
		console.log(e)
	}
}

export default {
	download,
	removeFile
}
