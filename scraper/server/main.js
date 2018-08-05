const express = require('express')
const rp = require('request-promise')
const morgan = require('morgan')

const scraper = require('../scraper/index')

const app = express()
const port = 8081
app.use(morgan('short'))

app.get('/', async (req, res) => {
  const url = req.query.characterName
    ? `http://fireemblem.wikia.com/wiki/${req.query.characterName}`
    : 'http://fireemblem.wikia.com/wiki/Avatar_(Awakening)'
  try {
    const webpage = await rp(url)
    const result = await scraper.scrapeCharacter(webpage)
    res.send(result)
  } catch (err) {
    if (err.statusCode && err.statusCode === 404)
    {
      res.status(404)
        .send('404, Character page not found')
    } else {
      res.status(404)
        .send('Error')
    }
  }
})

app.get('/characters', async (req, res) => {
  const url = req.query.gameName
    ? `http://fireemblem.wikia.com/wiki/List_of_characters_in_Fire_Emblem_${req.query.gameName}`
    : 'http://fireemblem.wikia.com/wiki/List_of_characters_in_Fire_Emblem_Awakening'
  try {
    //TODO: rp to scraper, just give character/game name?
    const webpage = await rp(url)
    const result = await scraper.scrapeGame(webpage)
    res.send(result)
  } catch (err) {
    if (err.statusCode && err.statusCode === 404)
    {
      res.status(404)
        .send('404, Game or character page not found')
    } else {
      res.status(404)
        .send('Error')
    }
  }
})

app.get('/class', async (req, res) => {
  const url = req.query.className
    ? `http://fireemblem.wikia.com/wiki/${req.query.className}`
    : 'http://fireemblem.wikia.com/wiki/Cavalier'
  const game = req.query.gameName === 'Awakening'
    ? 'FE13'
    : 'FE14'
  try {
    const webpage = await rp(url)
    const result = await scraper.scrapeClass(webpage, game)
    res.send(result)
  } catch (err) {
    if (err.statusCode && err.statusCode === 404)
    {
      res.status(404)
        .send('404, Class page not found')
    } else {
      res.status(404)
        .send('Error')
    }
  }
})

app.listen(port, () => console.log(`Listening on ${port}`)) // eslint-disable-line no-console
