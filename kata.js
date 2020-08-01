const bent = require('bent')
const fs = require('fs')
const Nightmare = require('Nightmare')

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
    data: genSource(kata)
  }

  const spec = {
    name: kata.slug + '.spec.js',
    data: genTests(kata)
  }

  saveKata(kata, [code, spec]);
})()

async function getKata(slug) {
  return Promise.all([getKataInfo(slug), getKataCode(slug)])
    .then(([ kata, code ]) => ({ ...kata, code }));
}

async function getKataInfo(slug) {
  const get = bent('https://www.codewars.com/', 'GET', 'json')
  return get('api/v1/code-challenges/' + slug)
}

async function getKataCode(slug) {
  const nightmare = Nightmare()
  return nightmare
    .goto(`https://www.codewars.com/kata/${slug}/train/javascript`)
    .wait('#code_container')
    .evaluate(() => Array.from(
       document.getElementsByClassName('CodeMirror-lines')[0]
      .getElementsByClassName('CodeMirror-line'))
      .map(e => e.textContent)
      .join('\n'))
    .end()
}

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
  return `require('./${kata.slug}.js');`
}