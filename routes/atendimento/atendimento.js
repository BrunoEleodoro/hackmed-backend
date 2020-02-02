var queries;
var ObjectId = require('mongodb').ObjectId

async function novo(req, res) {
    var customBody = req.body
    customBody.finalizado = 0
    customBody.agendado = 0
    customBody.timestamp = Date.now()
    var result = await queries.create(customBody, 'Atendimentos', 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result
    })
}

async function listar(req, res) {
    var result = await queries.read({ agendado: 0 }, {}, { timestamp: -1 }, 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result
    })
}

module.exports = {
    novo: novo,
    listar: listar,
    setQueries: (queriesParam) => {
        queries = queriesParam
    }
}