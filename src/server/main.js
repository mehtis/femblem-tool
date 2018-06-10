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
    console.log('Sending ' + JSON.stringify(result))
    res.send(result)
  } catch (err) {
    if (err.statusCode && err.statusCode === 404)
    {
      console.log("404, Character page not found")
      res.send("404, Character page not found")
    } else {
      console.log(err)
      res.send("Error")
    }
  }
})

app.listen(8081, () => console.log('Listening on 8081'))
