const Express = require('express')
const app = Express()
const PORT = 4000

app.use(Express.json())
app.use(Express.urlencoded({extended: true}))

app.get('/', (_, res) => {
  res.send('howdy!')
})

app.get('/pokemon', (_, res) => {
  //get all pokemons

  res.status(200).send()
})

app.get('/pokemon/:id', (req, res) => {
  //get pokemon by id
  let pokemon = req.params.id

  res.status(200).send()
})

app.get('/search', (req, res) => {
  let pokemonToSearch = req.query


  res.status(200).send()
})

app.post('/pokemon', (req, res) => {
  const pokemonToWrite = req.body

  res.status(200).send({
    msg: "success!"
  })
})

app.listen(PORT, () => {
  console.log(`listening for connections on port ${PORT}`)
})