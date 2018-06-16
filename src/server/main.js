const express = require('express')
const rp = require('request-promise')
const scraper = require('./scraper/index')
const morgan = require('morgan')

const app = express()
app.use(morgan('short'))

app.get('/', async (req, res) => {
  const url = req.query.characterName
    ? `http://fireemblem.wikia.com/wiki/${req.query.characterName}`
    : 'http://fireemblem.wikia.com/wiki/Avatar_(Awakening)'
  try {
    const webpage = await rp(url)
    const result = await scraper(webpage)
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

app.listen(8081, () => console.log('Listening on 8081')) // eslint-disable-line no-console
