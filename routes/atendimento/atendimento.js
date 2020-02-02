var queries;
var ObjectId = require('mongodb').ObjectId

async function novo(req, res) {
    var customBody = req.body
    customBody.finalizado = 0
    customBody.agendado = 0
    customBody.timestamp = Date.now()
    customBody.codigo = Math.floor(100000 + Math.random() * 900000)
    var result = await queries.create(customBody, 'Atendimentos', 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result,
        codigo: customBody.codigo
    })
}

async function listar(req, res) {
    var result = await queries.read({ agendado: 0 }, {}, { timestamp: -1 }, 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result
    })
}

async function atualizar(req, res) {
    var result = await queries.update(req.params.id, req.body, 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result
    })
}

async function agendar(req, res) {
    var result = await queries.read({ _id: ObjectId(req.params.id) }, {}, { timestamp: -1 }, 'atendimentos')
    result = result[0]
    result.agendado = req.email
    var result = await queries.update(req.params.id, result, 'atendimentos')
    res.status(200).send({
        status: 200,
        response: result
    })
}

async function finalizar(req, res) {
    var result = await queries.read({ codigo: req.body.codigo }, {}, { timestamp: -1 }, 'atendimentos')
    if (result.length == 1) {
        var customBody = result[0]
        customBody.finalizado = req.email
        var result = await queries.update(req.params.id, customBody, 'atendimentos')
        res.status(200).send({
            status: 200,
            response: result
        })
    } else {
        res.status(201).send({
            status: 201,
            response: 'error',
            message: 'specify the code'
        })
    }

}


module.exports = {
    novo: novo,
    listar: listar,
    atualizar: atualizar,
    agendar: agendar,
    finalizar: finalizar,
    setQueries: (queriesParam) => {
        queries = queriesParam
    }
}