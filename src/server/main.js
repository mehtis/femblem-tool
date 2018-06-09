const express = require('express')
const rp = require('request-promise')
const scraper = require('./scraper/index')

const app = express()

app.get('/', async (req, res) => {
  const url = req.query.characterName
  ? `http://fireemblem.wikia.com/wiki/${req.query.characterName}`
  : 'http://fireemblem.wikia.com/wiki/Avatar_(Awakening)'
  try {
    const webpage = await rp(url)
    const result = await scraper(webpage)
    console.log('Sending ' + result)
    res.send(result)
  } catch (err) {
    console.log(err)
    res.send("Error")
  }
})

app.listen(8081, () => console.log('Listening on 8081'))
