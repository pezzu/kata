const bent = require('bent')
const fs = require('fs')

const kataId = process.argv[2]

if (!kataId) {
  console.error('Command line: kata.js <id|slug>')
  process.exit(1)
}

(async () => {
  const kata = await getKata(kataId)
  const readme = {
    name: 'README.md',
    data: createReadMe(kata)
  }

  const code = {
    name: kata.slug + '.js',
    data: ''
  }

  saveKata(kata, [readme, code]);
})()

async function getKata(slug) {
  const get = bent('https://www.codewars.com/', 'GET', 'json')
  return get('api/v1/code-challenges/' + slug)
}

function saveKata(kata, files) {
  files.forEach(file => {
    console.log(`Saving ${kata.slug}: ${file.name}`)
    fs.writeFileSync(file.name, file.data)
  });
}

function createReadMe(kata) {
  return `# ${kata.name}\n${kata.description}`
}



