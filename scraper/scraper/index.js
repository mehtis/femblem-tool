const cheerio = require('cheerio')
const rp = require('request-promise')

const characterScrape = async (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const character = {
      characterName: $('.pi-title').text(),
      startingClass: $('#Base_Stats').parent().nextAll('.statbox').find('td').first().find('a').last().text(),
      baseClasses: baseClasses($),
      growthRates: {
        'hp':  growthRate($, 1),
        'str':  growthRate($, 2),
        'mag':  growthRate($, 3),
        'skl':  growthRate($, 4),
        'spd':  growthRate($, 5),
        'lck':  growthRate($, 6),
        'def':  growthRate($, 7),
        'res':  growthRate($, 8),
      },
      maxStatModifiers: {
        'str':  statModifiers($, 1),
        'mag':  statModifiers($, 2),
        'skl':  statModifiers($, 3),
        'spd':  statModifiers($, 4),
        'lck':  statModifiers($, 5),
        'def':  statModifiers($, 6),
        'res':  statModifiers($, 7),
      },
      romanticSupports: supportUnits($, 'Romantic Supports'),
      otherSupports: supportUnits($, 'Other Supports'),
    }
    if (character.characterName) {
      resolve(character)
    } else {
      reject(Error('Character data not found'))
    }
  })
}

const gameScrape = async (webpage) => {
  return await new Promise(async (resolve, reject) => {
    const $ = cheerio.load(webpage)
    const characterUrlEndings = $('#Playable_Characters').parent().nextUntil('h2').find('div[class=link] > a[title]').toArray().map( (name) => $(name).attr('href'))
    try {
      const characters = await Promise.all(characterUrlEndings.map( async (character) => {
        const url = `http://fireemblem.wikia.com/${character}`
        const characterPage = await rp(url)
        return await characterScrape(characterPage)
      }))
      if (characters) {
        resolve(Object.assign({}, ...characters.map(character => ({[character['characterName']]: character}))))
      } else {
        reject(Error('Character data not found'))
      }
    } catch (err) {
      if(err.statusCode && err.statusCode === 404){
        reject(Error('Problems loading one of the character pages'))
      }
      else {
        reject(Error('Something went wrong'))
      }
    }
  })
}

const baseClasses = ($) => $('#Class_Sets').parent().next('table').find('tr > td[rowspan] > div > a[title]').toArray().map( (className) => $(className).text())

//TODO: growthRateWithClass (e.g. Lissa)
const growthRate = ($, index) => $('#Growth_Rates').parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()

const statModifiers = ($, index) => $('#Max_Stat_Modifers').parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()

const supportUnits = ($, type) => $('#Supports').parent().nextAll('p').children(`b:contains('${type}')`).parent().nextAll('ul').first().text().split('\n').slice(0, -1)

module.exports.scrapeCharacter = characterScrape
module.exports.scrapeGame = gameScrape
