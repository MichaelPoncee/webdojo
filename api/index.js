const express = require('express')
const cors = require('cors')
const app = express()
const port = 3333

//habilita CORS para todas as origens, para a aplicação rodar a api
app.use(cors())//se fosse colocar em prod, teria que colocar o endereço na api

//trabalhar com envio de json
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})
//criando o retorno de sucesso quando criar um usuario
app.post('/api/users/register', (req, res) => {

  // criando constantes para o json
  const { name, email, password } = req.body

  // se o nome ficar em branco ou campo deletato = mensagem de erro Name is required o (!name) obriga ele ser um campo obrigatorio
  if (!name) {
    return res.status(400).json({ error: 'Name is required' })
  }

  // se o email ficar em branco ou campo deletato = mensagem de erro Email is required o (!email) obriga ele ser um campo obrigatorio
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // se o password ficar em branco ou campo deletato = mensagem de erro password is required o (!password) obriga ele ser um campo obrigatorio
  if (!password) {
    return res.status(400).json({ error: 'Password is required' })
  }

  //imprimir o corpo da req
  console.log(req.body)
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
