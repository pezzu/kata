const fs = require('fs')

const { extractId } = require('./cw-url-parser')
const { getKata } = require('./codewars')

const kataId = extractId(process.argv[2])

if (!kataId) {
  console.error('Command line: kata.js <id|slug>')
  process.exit(1)
}

(async () => {
  const kata = await getKata(kataId)
  const code = {
    name: kata.slug + '.js',
    data: genSource(kata)
  }

  const spec = {
    name: kata.slug + '.spec.js',
    data: genTests(kata)
  }

  saveKata(kata, [code, spec]);
})()

function saveKata(kata, files) {
  files.forEach(file => {
    console.log(`Saving ${kata.name}: ${file.name}`)
    fs.writeFileSync(file.name, file.data)
  });
}

function getMarkDown(kata) {
  return `/**\n# [${kata.name}](${kata.url}) (${kata.rank.name})\n---\n${kata.description}\n*/`
}

function genSource(kata) {
  return `${getMarkDown(kata)}\n\n${kata.code}`
}

function genTests(kata) {
  return `const Test = require("@codewars/test-compat")`
}