const cheerio = require('cheerio')

const scrape = (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const characterName = $('.pi-title').text()
    if (characterName) {
      resolve(characterName)
    } else {
      reject(Error('Character name not found'))
    }
  })
}
module.exports = scrape
