const PORT = 4000

const axios = require('axios').default
const experss = require('express')
const cors = require('cors')
require('dotenv').config()

const app = experss()
app.use(cors())
app.use(experss.json())

app.post('/solve', (req, res) => {
  console.log(req.body.numbers)
  var options = {
    method: 'POST',
    url: 'https://solve-sudoku.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'solve-sudoku.p.rapidapi.com',
      'x-rapidapi-key': process.env.API_KEY,
    },
    data: {
      puzzle: req.body.numbers,
    },
  }

  axios
    .request(options)
    .then((response) => {
      console.log(response.data)
      res.json(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
})
app.listen(PORT, () => console.log(`server running on Port ${PORT}`))
