const bent = require('bent')
const Nightmare = require('Nightmare')

const CODEWARS_URL = 'https://www.codewars.com/'

const getCodeChallengeInfo = async (id) => {
  const get = bent(CODEWARS_URL, 'GET', 'json')
  return get(`api/v1/code-challenges/${id}`)
}

const grabSourceCode = async (id) => {
  const nightmare = Nightmare()
  return nightmare
    .goto(`${CODEWARS_URL}/kata/${id}/train/javascript`)
    .wait('#code_container')
    .evaluate(() => Array.from(
       document.getElementsByClassName('CodeMirror-lines')[0]
      .getElementsByClassName('CodeMirror-line'))
      .map(e => e.textContent)
      .join('\n'))
    .end()
}

const getKata = async (id) => {
  return Promise.all([getCodeChallengeInfo(id), grabSourceCode(id)])
    .then(([ kata, code ]) => ({ ...kata, code }));
}

module.exports = { getKata }