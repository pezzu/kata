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
    .evaluate(() =>
      Array.from(document.getElementsByClassName('CodeMirror-lines'))
        .map(element => element.getElementsByClassName('CodeMirror-line'))
        .map(element => Array.from(element)
          .map(element => element.textContent)
          .join('\n'))
        )
    .end()
}

const getKata = async (id) => {
  return Promise.all([getCodeChallengeInfo(id), grabSourceCode(id)])
    .then(([ kata, [code, test] ]) => ({ ...kata, code, test }));
}

const extractId = (urlOrSlug) => {
  const url = `${CODEWARS_URL}kata\/([^\/]+)`
  const urlre = new RegExp(url, 'i');
  return urlre.test(urlOrSlug)? urlOrSlug.match(urlre)[1] : urlOrSlug;
}

module.exports = { getKata, extractId }