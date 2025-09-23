const express = require('express')
const app = express()
const port = 3333

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', (req, res) => {

  return res.status(201).end()

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
