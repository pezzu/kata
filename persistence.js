const fs = require('fs')
const path = require('path')

const saveKata = (kata, files, options = {}) => {
  
  if (options.directory) {
    fs.mkdirSync(options.directory, { recursive: true })
    files = files.map(file => ({ ...file, name: path.join(options.directory, file.name) }))
  }

  files.forEach(file => {
    console.log(`Saving ${kata.name}: ${file.name}`)
    fs.writeFileSync(file.name, file.data)
  });
}

module.exports = { saveKata }