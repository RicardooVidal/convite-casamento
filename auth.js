const Usuario = require("./models/usuario");

module.exports.isAuthorized  = async function(req, res, next) {
    if (!req.query.token) {
        let err = new Error('Token not provided');
        err.status = 403;
        return next(err);
    }

    let user = await Usuario.findOne({
        where: {token: req.query.token}
    });

    if (!user) {
        let err = new Error('Somente os noivos e pessoas autorizadas podem acessar essa rota.');
        err.status = 401;
        return next(err);
    }

    return next();
}