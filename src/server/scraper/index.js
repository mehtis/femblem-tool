const cheerio = require('cheerio')

const scrape = (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const data = {
      characterName: $('.pi-title').text(),
      startingClass: $('.statbox').first().find('td').first().find('a').last().text(),
      growthRates: {
        hp:  growthRate($, 1),
        str:  growthRate($, 2),
        mag:  growthRate($, 3),
        skl:  growthRate($, 4),
        spd:  growthRate($, 5),
        lck:  growthRate($, 6),
        def:  growthRate($, 7),
        res:  growthRate($, 8),
      }
    }

    //const startingClass = $('.statbox')
    if (data.characterName) {
      resolve(data)
    } else {
      reject(Error('Character data not found'))
    }
  })
}

const growthRate = ($, index) => {
  return $('#Growth_Rates').parent().next().find('.s-cells').children(`td:nth-child(${index})`).text().trim()
}
module.exports = scrape
