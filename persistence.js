const fs = require('fs')

const saveKata = (kata, files, options = {}) => {
  files.forEach(file => {
    console.log(`Saving ${kata.name}: ${file.name}`)
    fs.writeFileSync(file.name, file.data)
  });
}

module.exports = { saveKata }