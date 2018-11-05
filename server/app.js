const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/router')
const todoRoute = require('./routes/todo')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', route)
app.use('/todo', todoRoute)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found!' })
})

app.listen(port, () => {
  console.log('Listening on port', port)
})
