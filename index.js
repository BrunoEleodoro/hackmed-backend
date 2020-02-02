const express = require('express')
const protectedRoute = require('./middlewares/auth').protectedRoute
const generateToken = require('./utils/token').generateToken
const connect_db = require('./db/connection').connect_db
const queries = require('./utils/queries')
const bodyParser = require('body-parser')
const atendimento = require('./routes/atendimento/atendimento')
const cors = require('cors');
var db = "";
var app = express()

app.use(bodyParser.json())
app.use(cors());

var port = 3000

app.post('/atendimento/novo', atendimento.novo)
app.get('/atendimento/listar', atendimento.listar)

// we must wait for mongodb container to go up (20 secs)
setTimeout(async () => {
    db = await connect_db()
    queries.setDatabase(db)

    atendimento.setQueries(queries)

    app.listen(port, () => {
        console.log('api listeninng on port=' + port)
    })
}, 5000)
