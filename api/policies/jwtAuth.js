var jwt = require('jsonwebtoken');

module.exports = function jwtAuth(req, res, next) {
  if (req.isSocket) {
    next();
  } else {
    var token = req.headers['token'] || req.param('token');
    if (token) {
      jwt.verify(token, 'LaTecnicaAlServicioDeLaPatria', function (err, decoded) {
        if (err) {
          return res.json(401, {error: true, message: 'Token invalido o caducado'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({error: true, message: 'Token no proporcionado.'});
    }
  }
}
