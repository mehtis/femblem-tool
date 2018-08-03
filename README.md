# Fire Emblem Tool
Very much WIP, let's see where we'll get to. Should be running on `https://femblem-tool.herokuapp.com/`.

## Running
Server
``` bash
npm run dev
```
Scraper
``` bash
npm run watch
```

## Usage
### Main app
Go to `localhost:3000` in your browser
Click on 'Awakening' or 'Fates'
Type '&characterName=*name*' at the end of the url, e.g. '&characterName=Frederick' (WIP)
### Scraper
Go to `localhost:8081` in your browser
You can use characterName as a query parameter (e.g. `http://localhost:8081/?characterName=Chrom`) to search for different characters.

For classes, `http://localhost:8081/class?className=Lord&gameName=Awakening`

Search for characters per game, e.g. `http://localhost:8081/characters?gameName=Fates`

## Attribution
Data downloaded from http://fireemblem.wikia.com/wiki/Fire_Emblem_Wiki
