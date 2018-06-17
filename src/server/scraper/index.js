const cheerio = require('cheerio')

const scrape = (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const data = {
      characterName: $('.pi-title').text(),
      startingClass: $('#Base_Stats').parent().nextAll('.statbox').find('td').first().find('a').last().text(),
      growthRates: {
        //TODO: Refactor to array (also statmodifiers)?
        hp:  growthRate($, 1),
        str:  growthRate($, 2),
        mag:  growthRate($, 3),
        skl:  growthRate($, 4),
        spd:  growthRate($, 5),
        lck:  growthRate($, 6),
        def:  growthRate($, 7),
        res:  growthRate($, 8),
      },
      maxStatModifiers: {
        str:  statModifiers($, 1),
        mag:  statModifiers($, 2),
        skl:  statModifiers($, 3),
        spd:  statModifiers($, 4),
        lck:  statModifiers($, 5),
        def:  statModifiers($, 6),
        res:  statModifiers($, 7),
      },
      romanticSupports: supportUnits($, 'Romantic Supports'),
      otherSupports: supportUnits($, 'Other Supports'),
    }

    if (data.characterName) {
      resolve(data)
    } else {
      reject(Error('Character data not found'))
    }
  })
}
//TODO: growthRateWithClass (e.g. Lissa)
const growthRate = ($, index) => {
  return $('#Growth_Rates').parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()
}

const statModifiers = ($, index) => {
  return $('#Max_Stat_Modifers').parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()
}

const supportUnits = ($, type) => {
  return $('#Supports').parent().nextAll('p').children(`b:contains('${type}')`).parent().nextAll('ul').first().text().split('\n').slice(0, -1)
}

module.exports = scrape
