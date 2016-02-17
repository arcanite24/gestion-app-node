/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function (req, res) {
		if (req.isSocket && req.method === 'POST') {
			var tempUser = req.allParams();
			User.create(tempUser).exec(function (err, user) {
				if (err) {
					console.log(err);
					res.json({error: true, message: 'Error.'});
				} else {
					User.publishCreate(user);
					res.json({error: false, message: 'Usuario creado.', user: user})
				}
			});
		}
	},

	remove: function (req, res) {
		if (req.isSocket && req.method == 'DELETE') {
			var idUser = req.param('id');
			User.destroy({id: idUser}).exec(function (err, user) {
				if (err) {
					console.log(err);
					res.json({error: true, message: 'Error al borrar usuario.', id: user.id});
				} else {
					User.publishDestroy(idUser);
					res.json({error: false, message: 'Usuario borrado.', id_user: idUser});
				}
			});
		}
	}

};
