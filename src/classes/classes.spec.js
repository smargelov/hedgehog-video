const Statistic = require('./classes.js')

describe('Statistic: methods', () => {
    let obj, botStatistic
    beforeEach(() => {
        obj = {users: ['qwe', 'rty'], allTime: 1299, videos: 30}
        botStatistic = new Statistic(obj)
    })
    test('should be defined', () => {
        expect(botStatistic.allTimeString).toBeDefined()
        expect(botStatistic.addUniqUser).toBeDefined()
        expect(botStatistic.usersCount).toBeDefined()
        expect(botStatistic.videoCountIncrement).toBeDefined()
        expect(botStatistic.setAllTimeSeconds).toBeDefined()
        expect(botStatistic.getNewStatisticObject).toBeDefined()
        expect(botStatistic.getJsonFromStatistic).toBeDefined()
        expect(botStatistic.writeToFile).toBeDefined()
    })
    test('should return correct value', () => {
        expect(botStatistic.allTimeString).toBe('0:21:39')
        expect(botStatistic.usersCount).toBe(2)
        expect(botStatistic.getNewStatisticObject()).toEqual(obj)
        expect(botStatistic.getJsonFromStatistic()).toBe('{"users":["qwe","rty"],"allTime":1299,"videos":30}')
    })
    test('should mutate object', () => {
        botStatistic.addUniqUser('asd')
        expect(botStatistic.usersCount).toBe(3)
        expect(botStatistic.users).toContain('7815696ecbf1c96e6894b779456d330e')
        botStatistic.videoCountIncrement(1)
        expect(botStatistic.videoCount).toBe(31)
        botStatistic.setAllTimeSeconds(123)
        expect(botStatistic.allTimeSeconds).toBe(1422)
        expect(botStatistic.getNewStatisticObject()).toEqual({
            users: ['qwe', 'rty', '7815696ecbf1c96e6894b779456d330e'],
            allTime: 1422,
            videos: 31
        })
    })
})
