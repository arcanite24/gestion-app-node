var jwt = require('jsonwebtoken');

module.exports = {
  login: function (req, res) {
    User.findOne({username: req.param('username')}, function (err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        res.json({logged: false, message: 'Usuario no encontrado.'});
      } else if (user) {
        if (user.password != req.param('password')) {
          res.json({logged: false, message: 'Contraseña incorrecta.'});
        } else {
          var token = jwt.sign(user, 'LaTecnicaAlServicioDeLaPatria', {
            expiresIn: 1440
          });
          console.log('Usuario: ' + user.username + ' logeado.');
          res.json({
            logged: true,
            message: 'Sesión iniciada correctamente.',
            token: token,
            user: user
          });
        }
      }

    });
  },
  register: function (req, res) {
    var userTemp = {
      username: req.param('username'),
      password: req.param('password')
    };
    User.create(userTemp, function (err, user) {
      if (err) {
        res.json({error: true, message: 'Error al registrar usuario.'});
      } else {
        res.json({error: false, message: 'Usuario registrado exitosamente.', user: user});
      }
    });
  }
}
