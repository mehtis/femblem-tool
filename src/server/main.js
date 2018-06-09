const express = require('express')
const request = require('request')
const cheerio = require('cheerio')

const app = express();

app.get('/', (req, res) => {
  const url = req.query.characterName
  ? `http://fireemblem.wikia.com/wiki/${req.query.characterName}`
  : 'http://fireemblem.wikia.com/wiki/Avatar_(Awakening)'

  request(url, (err, response, html) => {
    if(!err) {
      const $ = cheerio.load(html)
      const characterName = $('.pi-title').text()
      if (!characterName) {
        console.error('Character name not found')
        res.send('Error, character name not found')
      } else {
        console.log('Sending ' + characterName)
        res.send(characterName)
      }
      return
    }
  console.error('Error loading: '+ url)
  res.send('Error')
  })
})

app.listen(8081, () => console.log('Listening on 8081'))
