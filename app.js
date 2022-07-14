const Express = require('express')
const db = require('./db/pokemon.json')
const shapes = require('./db/pokemonClass')
const app = Express()
const PORT = 4000

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.get('/', (_, res) => {
  res.send('howdy!')
})

app.get('/pokemon', (_, res) => {
  res.status(200).send(db)
})

app.get('/pokemon/:id', (req, res) => {
  let pokemonId = req.params.id
  let foundPokemon = null
  for(let pokemon of db){
    if(pokemon.id === parseInt(pokemonId)){
      foundPokemon = pokemon
      break;
    }
  }
  if(foundPokemon){
    res.status(200).json(foundPokemon)
  } else {
    res.status(404).send('no pokemon of that ID was found')
  }
})

app.get('/search', (req, res) => {
  if(Object.keys(req.query).length == 0){
    res.status(406).send("you need to include search queries!")
  } else {
    let pokemonToSearch = req.query
    let searchObj = new shapes.Pokemon()
    let searchTerms = Object.keys(searchObj).filter(term => {
      if(Object.keys(pokemonToSearch).includes(term)){
        return term
      }
    })
    let foundPokemon = []
  
    for(let pokemon of db){
      searchTerms.forEach(term => {
        if(pokemonToSearch[term] == pokemon[term]){
          foundPokemon.push(pokemon)
        }
      })
    }
  
    if(foundPokemon.length > 0){
      res.status(200).json(foundPokemon)
    } else {
      res.status(404).send("no pokemon matching your search queries could be found...")
    }
  }
})

app.post('/pokemon', (req, res) => {
  if(Object.keys(req.body).length === 0){
    res.status(406).send('no body was included...')
  } else {
    const pokemonToWrite = req.body
    let newPokemon = new shapes.Pokemon
  
    res.status(200).send({
      msg: "success!"
    })
  }
})

app.listen(PORT, () => {
  console.log(`listening for connections on port ${PORT}`)
})