var queries;
var email_util = require('../../utils/email');
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

module.exports = {
    novo: novo,
    setQueries: (queriesParam) => {
        queries = queriesParam
    }
}