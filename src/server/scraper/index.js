const cheerio = require('cheerio')

const scrape = (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const data = {
      characterName: $('.pi-title').text(),
      startingClass: $('.statbox').first().find('td').first().find('a').last().text()
    }

    //const startingClass = $('.statbox')
    if (data) {
      resolve(data)
    } else {
      reject(Error('Character name not found'))
    }
  })
}
module.exports = scrape
