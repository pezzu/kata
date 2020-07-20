const { extractId } = require('./cw-url-parser')

describe('Can get kata id from CodeWars URL', () => {
    it('Works with URL to kata', () => {
        expect(extractId('https://www.codewars.com/kata/56f78a42f749ba513b00037f')).toEqual('56f78a42f749ba513b00037f')
    })

    it('Works with URL to kata training', () => {
        expect(extractId('https://www.codewars.com/kata/56f78a42f749ba513b00037f/train/javascript')).toEqual('56f78a42f749ba513b00037f')
    })

    it('Return original slug if not CodeWars URL is provided', () => {
        expect(extractId('56f78a42f749ba513b00037f')).toEqual('56f78a42f749ba513b00037f')
        expect(extractId('probabilities-for-sums-in-rolling-cubic-dice')).toEqual('probabilities-for-sums-in-rolling-cubic-dice')
    })
})