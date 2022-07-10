const {download, removeFile} = require('./helpers')
const fs = require('fs')

describe('Function "download"', () => {
    const testDirPath = 'test'
    beforeEach(() => {
        fs.mkdirSync(testDirPath)
    })
    afterEach(() => {
        fs.rm(testDirPath, {recursive: true})
    })
    test('should download file', async () => {
        const url = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
        const path = `${testDirPath}/test.png`
        const callback = () => {
            expect(fs.readdirSync(testDirPath)).toContain('test.png')
            expect(fs.existsSync(path)).toBe(true)
        }
        await download(url, path, callback)
    })
    test('should throw error', async () => {
        const url = 'https://www.google.com/images/wrong-path.png'
        const path = `${testDirPath}/test.png`
        const callback = jest.fn()
        await download(url, path, callback)
        expect(callback).not.toHaveBeenCalled()
        expect(fs.existsSync(path)).toBe(false)
    })
})

describe('Function "removeFile"', () => {
    const testDirPath = 'test'
    const testFileName = 'test.txt'
    beforeEach(() => {
        fs.mkdirSync(testDirPath)
    })
    afterEach(() => {
        fs.rm(testDirPath, {recursive: true})
    })
    test('should remove file', () => {
        const path = `${testDirPath}/${testFileName}`
        fs.writeFileSync(path, 'test')
        removeFile(path)
        expect(fs.readdirSync(testDirPath)).not.toContain(testFileName)
        expect(fs.existsSync(path)).toBe(false)
    })
    test('should throw error', () => {
        const path = `${testDirPath}/wrong-path.txt`
        expect(() => removeFile(path)).toThrow()
        expect(() => removeFile(null)).toThrowError('Path is not defined')
    })
})
