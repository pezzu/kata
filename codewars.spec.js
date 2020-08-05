const { getKata, extractId } = require('./codewars')

describe("Code Challege API", () => {
  it("Obtains challenge information from CodeWars REST API by challenge id", async () => {
    const kata = await getKata('5277c8a221e209d3f6000b56')
    
    expect(kata.id).toBe('5277c8a221e209d3f6000b56')
    expect(kata.name).toBe('Valid Braces')
    expect(kata.slug).toBe('valid-braces')
  })

  it("Obtains challenge information from CodeWars REST API by challenge slug", async () => {
    const kata = await getKata('valid-braces')
    
    expect(kata.id).toBe('5277c8a221e209d3f6000b56')
    expect(kata.name).toBe('Valid Braces')
    expect(kata.slug).toBe('valid-braces')
  })

  it("Throws reasonanble error if kata doesn't exist", async () => {

  })

  it("Grabs source code for challenge editor", async () => {
    const kata = await getKata('valid-braces')

    expect(kata.code).toEqual(`function validBraces(braces){\n  //TODO \n}`)
  })

  it("Grabs tests as well", async () => {
    const kata = await getKata('valid-braces')

    expect(kata.spec).toEqual(`Test.assertEquals(validBraces( "()" ), true);\nTest.assertEquals(validBraces( "[(])" ), false);`)
  })
})

describe('Can get kata id from Codewars URL', () => {
  it('Works with URL to kata', () => {
    expect(extractId('https://www.codewars.com/kata/56f78a42f749ba513b00037f')).toEqual('56f78a42f749ba513b00037f')
  })

  it('Works with URL to kata training', () => {
    expect(extractId('https://www.codewars.com/kata/56f78a42f749ba513b00037f/train/javascript')).toEqual('56f78a42f749ba513b00037f')
  })

  it('Return original slug if provided parameter is not URL', () => {
    expect(extractId('56f78a42f749ba513b00037f')).toEqual('56f78a42f749ba513b00037f')
    expect(extractId('probabilities-for-sums-in-rolling-cubic-dice')).toEqual('probabilities-for-sums-in-rolling-cubic-dice')
  })
})