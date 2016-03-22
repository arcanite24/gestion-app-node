/**
 * MensajeController
 *
 * @description :: Server-side logic for managing Mensajes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
		if (req.isSocket && req.method === 'POST') {
			var tempMsg = req.allParams();
			Mensaje.create(tempMsg).exec(function (err, msg) {
				if (err) {
					console.log(err);
					res.json({error: true, message: 'Error.'});
				} else {
					Mensaje.publishCreate(msg);
					return res.ok();
				}
			});
		}
	}
};
