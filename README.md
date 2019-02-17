# Fire Emblem Tool
Very much WIP, let's see where we'll get to. Should be running on https://femblem-tool.herokuapp.com/.

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
Select character from dropdown. Press + to add new characters.
### Scraper
Go to `localhost:8081` in your browser
You can use characterName as a query parameter (e.g. `http://localhost:8081/?characterName=Chrom`) to search for different characters.

For classes, `http://localhost:8081/class?className=Lord&gameName=Awakening`

Search for characters per game, e.g. `http://localhost:8081/characters?gameName=Fates`

## Attribution
Data collected from http://fireemblem.wikia.com/wiki/Fire_Emblem_Wiki, character portraits by [@ennuialina](https://twitter.com/ennuialina)
