const bent = require('bent')

const CODEWARS = 'https://www.codewars.com/'

const get = bent(CODEWARS, 'GET')
const post = bent(CODEWARS, 'POST', 'json')

const getCodeChallengeInfo = (id) => get(`api/v1/code-challenges/${id}`).then(response => response.json())

const grabSourceCode = (id) => {
  const headers = {}
  return get(`kata/${id}/train/javascript`)
    .then(page => {
      headers.Cookie = `${page.headers['set-cookie'][0].split(';')[0]}; ${page.headers['set-cookie'][1].split(';')[0]}`
      return page.text()
    })
    .then(text => {
      headers['x-csrf-token'] = text.match(/meta name="csrf-token" content="([^"]+)"/)[1]
      headers.authorization = text.match(/"jwt\\":\\"([^"\\]+)\\"/)[1]
      const session = text.match(/"session":"([^"]+)"/)[1].replace('%7Blanguage%7D', 'javascript')
      return post(session, null, headers)
    })
}

const getKata = (id) => {
  return Promise.all([getCodeChallengeInfo(id), grabSourceCode(id)])
    .then(([kata, session]) => ({ ...kata, code: session.setup, test: session.exampleFixture }))
}

const extractId = (urlOrSlug) => {
  const url = `${CODEWARS}kata/([^/]+)`
  const urlre = new RegExp(url, 'i')
  return urlre.test(urlOrSlug) ? urlOrSlug.match(urlre)[1] : urlOrSlug
}

module.exports = { getKata, extractId }
