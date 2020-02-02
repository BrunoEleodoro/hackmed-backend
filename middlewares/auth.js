var request = require('request')

module.exports = {
    protectedRoute: protectedRoute
}

function protectedRoute(req, res, next) {
    var token = req.headers.authorization
    try {
        token = token.split(' ')
        token = token[1]
        request.get('http://hackmed-auth:3001/verify?token=' + token, (error, response, body) => {
            if (error) {
                res.status(403).send({ status: 403, valid: false })
            } else if (JSON.parse(body).valid != undefined && JSON.parse(body).valid == false) {
                res.status(403).send({ status: 403, valid: false })
            } else {
                next();
            }
        });
    } catch (ex) {
        res.status(403).send({ status: 403, valid: false })
    }

}