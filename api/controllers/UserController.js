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
					return;
				} else {
					User.publishCreate(user);
				}
			});
		}
	}

};
