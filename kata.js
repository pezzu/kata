const { getKata, extractId } = require('./codewars')
const { saveKata } = require('./persistence')

const kataId = extractId(process.argv[2])

if (!kataId) {
  console.error('Command line: kata.js <id|slug>')
  process.exit(1)
}

(async () => {
  try {
    const kata = await getKata(kataId)
    const code = {
      name: kata.slug + '.js',
      data: genSource(kata)
    }

    const spec = {
      name: kata.slug + '.spec.js',
      data: genTests(kata)
    }

    const readme = {
      name: 'README.md',
      data: getMarkDown(kata)
    }

    const directory = process.argv[3] || kata.slug
    saveKata(kata, [code, spec, readme], { directory })
  } catch (e) {
    console.error('Runtime error: ', e)
    process.exit(1)
  }
})()

function getMarkDown (kata) {
  return `# [${kata.name}](${kata.url}) (${kata.rank.name})\n---\n${kata.description}\n`
}

function genSource (kata) {
  return kata.code
}

function genTests (kata) {
  return `const Test = require("@codewars/test-compat")\n\n${kata.test}`
}
