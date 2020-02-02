const express = require('express')
const protectedRoute = require('./middlewares/auth').protectedRoute
const generateToken = require('./utils/token').generateToken
const connect_db = require('./db/connection').connect_db
const queries = require('./utils/queries')
const bodyParser = require('body-parser')
const atendimento = require('./routes/atendimento/atendimento')
const users = require('./routes/users/users')
const cors = require('cors');
var db = "";
var app = express()

app.use(bodyParser.json())
app.use(cors());

var port = 3000

app.post('/atendimento/novo', atendimento.novo)
app.get('/atendimento/listar', protectedRoute, atendimento.listar)

app.post('/users/auth', users.auth)
app.post('/users/cadastrar', users.cadastrar)

app.post('/atendimento/agendar/:id', protectedRoute, atendimento.agendar)
app.post('/atendimento/finalizar/:id', protectedRoute, atendimento.finalizar)

// we must wait for mongodb container to go up (20 secs)
setTimeout(async () => {
    db = await connect_db()
    queries.setDatabase(db)

    atendimento.setQueries(queries)
    users.setQueries(queries)

    app.listen(port, () => {
        console.log('api listeninng on port=' + port)
    })
}, 5000)
