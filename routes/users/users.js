var bcrypt = require('bcrypt');
const saltRounds = 10;
var queries;
var ObjectId = require('mongodb').ObjectId
const generateToken = require('../../utils/token').generateToken

async function cadastrar(req, res) {
    var senha = req.body.senha || ""
    if (senha != undefined) {
        var result = await queries.read({ email: req.body.email }, {}, {}, 'users')
        if (result.length == 0) {
            bcrypt.hash(senha, saltRounds, async function (err, hash) {
                var customBody = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash
                };
                var result = await queries.create(customBody, 'Users', 'users')
                res.status(200).send({
                    status: 200,
                    response: result
                })
            });
        } else {
            res.status(201).send({
                status: 201,
                response: 'Email already exists'
            })
        }

    }
}

async function auth(req, res) {
    var email = req.body.email || ""
    var senha = req.body.senha || ""
    if (email && senha) {
        var result = await queries.read({ email: email }, {}, {}, 'users')
        if (result.length == 1) {
            var user = result[0]
            // console.log('senha=' + senha, user)

            var result_bcrypt = bcrypt.compareSync(senha, user.senha)

            if (result_bcrypt == true) {
                var token = await generateToken(email);
                res.send({
                    status: 200,
                    token: token.token
                })
            } else {
                console.log('erro na comparacao', result_bcrypt)
                res.send({
                    status: 403,
                    message: 'Não autorizado'
                })
            }

        } else {
            console.log('erro no usuario nnao encontrado,', result)
            res.send({
                status: 403,
                message: 'Não autorizado'
            })
        }

    } else {
        console.log('missing fields login')
        res.send({
            status: 403,
            message: 'Não autorizado'
        })
    }
}


module.exports = {
    auth: auth,
    cadastrar: cadastrar,
    setQueries: (queriesParam) => {
        queries = queriesParam
    }
}