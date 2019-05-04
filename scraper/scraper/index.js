const cheerio = require('cheerio')
const rp = require('request-promise')

const scrapeCharacter = async (webpage) => {
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

const scrapeGameForCharacters = async (webpage) => {
  return new Promise(async (resolve, reject) => {
    const $ = cheerio.load(webpage)
    //TODO: Working with Fates classpage
    const characterUrlEndings = $('#Playable_Characters').parent().nextUntil('h2').find('div[class=link] > a[title]').toArray().map( (name) => $(name).attr('href'))
    try {
      const characters = await Promise.all(characterUrlEndings.map(async (character) => {
        const url = `http://fireemblem.wikia.com/${character}`
        const characterPage = await rp(url)
        return await scrapeCharacter(characterPage)
      }))
      if (characters) {
        resolve(Object.assign({}, ...characters.map(character => ({[character['characterName']]: character}))))
      } else {
        reject(Error('Character data not found'))
      }
    } catch (err) {
      if (err.statusCode && err.statusCode === 404) {
        reject(Error('Problem loading character page'))
      }
      else {
        reject(Error('Something went wrong'))
      }
    }
  })
}

const baseClasses = ($) => $('#Class_Sets').parent().nextAll('table').first().find('tr > td[rowspan] > div > a[title]').toArray().map( (className) => $(className).text().trim())

//TODO: growthRateWithClass (e.g. Lissa)
const characterStat = ($, index, stat) => $(stat).parent().nextAll('.statbox').first().find('.s-cells').children(`td:nth-child(${index})`).text().trim()

const supportUnits = ($, type) => $('#Supports').parent().nextAll('p').children(`b:contains('${type}')`).parent().nextAll('ul').first().text().split('\n').slice(0, -1)

const scrapeClass = async (webpage, gameNumber, gameName) => {
  return new Promise ((resolve, reject) => {
    const $ = cheerio.load(webpage)
    const classStats = {
      className: $('.pi-title').text(),
      baseStats: {
        'hp':   classStat($, 0, '#Base_Stats', gameNumber),
        'str':  classStat($, 1, '#Base_Stats', gameNumber),
        'mag':  classStat($, 2, '#Base_Stats', gameNumber),
        'skl':  classStat($, 3, '#Base_Stats', gameNumber),
        'spd':  classStat($, 4, '#Base_Stats', gameNumber),
        'lck':  classStat($, 5, '#Base_Stats', gameNumber),
        'def':  classStat($, 6, '#Base_Stats', gameNumber),
        'res':  classStat($, 7, '#Base_Stats', gameNumber),
        'mov':  classStat($, 8, '#Base_Stats', gameNumber),
        'weapons': classWeapons($, '#Base_Stats', gameNumber),
      },
      maxStats: {
        'hp':   classStat($, 0, '#Maximum_Stats', gameNumber),
        'str':  classStat($, 1, '#Maximum_Stats', gameNumber),
        'mag':  classStat($, 2, '#Maximum_Stats', gameNumber),
        'skl':  classStat($, 3, '#Maximum_Stats', gameNumber),
        'spd':  classStat($, 4, '#Maximum_Stats', gameNumber),
        'lck':  classStat($, 5, '#Maximum_Stats', gameNumber),
        'def':  classStat($, 6, '#Maximum_Stats', gameNumber),
        'res':  classStat($, 7, '#Maximum_Stats', gameNumber),
        'mov':  classStat($, 8, '#Maximum_Stats', gameNumber),
        'weapons': classWeapons($, '#Maximum_Stats', gameNumber),
      },
      classGrowthRates: {
        'hp':   classStat($, 0, '#Growth_Rates', gameNumber),
        'str':  classStat($, 1, '#Growth_Rates', gameNumber),
        'mag':  classStat($, 2, '#Growth_Rates', gameNumber),
        'skl':  classStat($, 3, '#Growth_Rates', gameNumber),
        'spd':  classStat($, 4, '#Growth_Rates', gameNumber),
        'lck':  classStat($, 5, '#Growth_Rates', gameNumber),
        'def':  classStat($, 6, '#Growth_Rates', gameNumber),
        'res':  classStat($, 7, '#Growth_Rates', gameNumber),
      },
      //TODO: Skill effect
      classSkills: classSkills($, '#Class_Skills', gameNumber, gameName),
      promotions: {
        method: classPromotionMethod($, '#Promotions', gameNumber),
        classNames: classPromotionNames($, '#Promotions', gameNumber),
      },
    }
    if (classStats.className) {
      resolve(classStats)
    } else {
      reject(Error('Class data not found'))
    }
  })
}

const classCrawl = ($, stat, gameNumber) => $(stat).parent().nextAll('.wikitable').first()
  .find('tbody > tr > th > a')
  .filter( (i, el) => $(el).text() === gameNumber)
  .parent().siblings()


const classStat = ($, index, stat, gameNumber) => $(classCrawl($, stat, gameNumber)).eq(index).text().trim()

const classWeapons = ($, stat, gameNumber) => $(classCrawl($, stat, gameNumber)).last().children()
  .map((i, el) =>
    [{
      'weapon': $(el).attr('title'),
      'rank': el.next.data.trim() }]
  ).toArray()

const classSkills = ($, stat, gameNumber) => $(classCrawl($, stat, gameNumber)).first().children()
  .map((i, el) =>
    i % 3 === 1
      ? {
        skillName: $(el).text(),
        requirements: el.parent.next.children[(i+2)/3*2-2].data.trim(),
      } : null
  ).toArray()

const classPromotionMethod = ($, stat, gameNumber) =>  $(classCrawl($, stat, gameNumber)).first().next().children().remove('.image').parent().text()

const classPromotionNames = ($, stat, gameNumber) =>  $(classCrawl($, stat, gameNumber)).first().next().next().children()
  .map((i, el) =>
    i % 3 === 1
      ? $(el).text()
      : null
  ).toArray()

const scrapeGameForClasses = async (webpage, gameNumber) => {
  return new Promise(async (resolve, reject) => {
    const $ = cheerio.load(webpage)
    const playableClassesList = classUrlEndings($, '#Playable_Classes')
    const mainClassesList = classUrlEndings($, '#Main_Classes')
    const nohrClassesList = classUrlEndings($, '#Nohr_Classes')
    const hoshidoClassesList = classUrlEndings($, '#Hoshido_Classes')
    const DLCClassesList = classUrlEndings($, '#DLC_Classes')
    const classUrlEndingsList = playableClassesList.concat(mainClassesList, nohrClassesList, hoshidoClassesList,DLCClassesList)
    try {
      const classes = await Promise.all(classUrlEndingsList.map(async (classUrls) => {
        const url = `http://fireemblem.wikia.com/${classUrls}`
        const classPage = await rp(url)
        return await scrapeClass(classPage, gameNumber)
      }))
      if (classes) {
        resolve(Object.assign({}, ...classes.map(classStats => ({[classStats['className']]: classStats}))))
      } else {
        reject(Error('Class data not found'))
      }
    } catch (err) {
      if (err.statusCode && err.statusCode === 404) {
        reject(Error('Problem loading class page'))
      }
      else {
        reject(Error('Something went wrong'))
      }
    }
  })
}

const classUrlEndings = ($, tableHeader) => $(tableHeader).parent().next().find('tbody').children().nextAll().map((i, el) => ($(el).children().first().next().children().attr('href'))).toArray()

module.exports.scrapeCharacter = scrapeCharacter
module.exports.scrapeClass = scrapeClass
module.exports.scrapeGameForCharacters = scrapeGameForCharacters
module.exports.scrapeGameForClasses = scrapeGameForClasses
