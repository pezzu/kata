const bent = require('bent')
const fs = require('fs')

const { extractId } = require('./cw-url-parser')

const kataId = extractId(process.argv[2])

if (!kataId) {
  console.error('Command line: kata.js <id|slug>')
  process.exit(1)
}

(async () => {
  const kata = await getKata(kataId)
  const code = {
    name: kata.slug + '.js',
    data: `/**\n# [${kata.name}](${kata.url}) (${kata.rank.name})\n---\n${kata.description}\n*/`
  }

  const spec = {
    name: kata.slug + '.spec.js',
    data: `require('./${code.name}')`
  }

  saveKata(kata, [code, spec]);
})()

async function getKata(slug) {
  const get = bent('https://www.codewars.com/', 'GET', 'json')
  return get('api/v1/code-challenges/' + slug)
}

function saveKata(kata, files) {
  files.forEach(file => {
    console.log(`Saving ${kata.name}: ${file.name}`)
    fs.writeFileSync(file.name, file.data)
  });
}

function createReadMe(kata) {
  return `# ${kata.name}\n${kata.description}`
}