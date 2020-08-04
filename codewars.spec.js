const { getKata } = require('./codewars')

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