const cheerio = require('cheerio')
const rp = require('request-promise')

const characterScrape = async (webpage) => {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const characterStats = {
      characterName: $('.pi-title').text(),
      startingClass: $('#Base_Stats').parent().nextAll('.statbox').find('td').first().find('a').last().text(),
      baseClasses: baseClasses($),
      growthRates: {
        'hp':   characterStat($, 1, '#Growth_Rates'),
        'str':  characterStat($, 2, '#Growth_Rates'),
        'mag':  characterStat($, 3, '#Growth_Rates'),
        'skl':  characterStat($, 4, '#Growth_Rates'),
        'spd':  characterStat($, 5, '#Growth_Rates'),
        'lck':  characterStat($, 6, '#Growth_Rates'),
        'def':  characterStat($, 7, '#Growth_Rates'),
        'res':  characterStat($, 8, '#Growth_Rates'),
      },
      maxStatModifiers: {
        'str':  characterStat($, 1, '#Max_Stat_Modifers'),
        'mag':  characterStat($, 2, '#Max_Stat_Modifers'),
        'skl':  characterStat($, 3, '#Max_Stat_Modifers'),
        'spd':  characterStat($, 4, '#Max_Stat_Modifers'),
        'lck':  characterStat($, 5, '#Max_Stat_Modifers'),
        'def':  characterStat($, 6, '#Max_Stat_Modifers'),
        'res':  characterStat($, 7, '#Max_Stat_Modifers'),
      },
      romanticSupports: supportUnits($, 'Romantic Supports'),
      otherSupports: supportUnits($, 'Other Supports'),
    }
    if (characterStats.characterName) {
      resolve(characterStats)
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

const baseClasses = ($) => $('#Class_Sets').parent().next('table').find('tr > td[rowspan] > div > a[title]').toArray().map( (className) => $(className).text().trim())

//TODO: growthRateWithClass (e.g. Lissa)
const characterStat = ($, index, stat) => $(stat).parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()

const supportUnits = ($, type) => $('#Supports').parent().nextAll('p').children(`b:contains('${type}')`).parent().nextAll('ul').first().text().split('\n').slice(0, -1)

const scrapeClass = async (webpage, game) => {
  return new Promise ((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const classStats = {
      className: $('.pi-title').text(),
      baseStats: [{
        'hp':   classStat($, 0, '#Base_Stats', game),
        'str':  classStat($, 1, '#Base_Stats', game),
        'mag':  classStat($, 2, '#Base_Stats', game),
        'skl':  classStat($, 3, '#Base_Stats', game),
        'spd':  classStat($, 4, '#Base_Stats', game),
        'lck':  classStat($, 5, '#Base_Stats', game),
        'def':  classStat($, 6, '#Base_Stats', game),
        'res':  classStat($, 7, '#Base_Stats', game),
        'mov':  classStat($, 8, '#Base_Stats', game),
        'weapons': [], //TODO: <-
      }],
      maxStats: [{
        'hp':   classStat($, 0, '#Maximum_Stats', game),
        'str':  classStat($, 1, '#Maximum_Stats', game),
        'mag':  classStat($, 2, '#Maximum_Stats', game),
        'skl':  classStat($, 3, '#Maximum_Stats', game),
        'spd':  classStat($, 4, '#Maximum_Stats', game),
        'lck':  classStat($, 5, '#Maximum_Stats', game),
        'def':  classStat($, 6, '#Maximum_Stats', game),
        'res':  classStat($, 7, '#Maximum_Stats', game),
        'mov':  classStat($, 8, '#Maximum_Stats', game),
        'weapons': [], //TODO: <-
      }],
      growthRates: [{
        'hp':   classStat($, 0, '#Growth_Rates', game),
        'str':  classStat($, 1, '#Growth_Rates', game),
        'mag':  classStat($, 2, '#Growth_Rates', game),
        'skl':  classStat($, 3, '#Growth_Rates', game),
        'spd':  classStat($, 4, '#Growth_Rates', game),
        'lck':  classStat($, 5, '#Growth_Rates', game),
        'def':  classStat($, 6, '#Growth_Rates', game),
        'res':  classStat($, 7, '#Growth_Rates', game),
      }],
      classSkills: [{
        skillName: '',
        requirements: ''
      }],
      promotions: {
        method: '',
        classes: []
      }
    }
    if (classStats.className) {
      resolve(classStats)
    } else {
      reject(Error('Class data not found'))
    }
  })
}

const classStat = ($, index, stat, game) => $(stat).parent().nextAll('.wikitable').first().find('tr > td > b')
  .filter((i, el) => $(el).text() === game)
  .parent().siblings().eq(index).text().trim()

module.exports.scrapeCharacter = characterScrape
module.exports.scrapeClass = scrapeClass
module.exports.scrapeGame = gameScrape
