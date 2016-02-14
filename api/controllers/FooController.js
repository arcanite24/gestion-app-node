/**
 * FooController
 *
 * @description :: Server-side logic for managing Foos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	protected: function (req, res) {
		return res.ok("Ruta protegida.");
	},

	notProtected: function (req, res) {
		return res.ok("Ruta no protegida.");
	}

};
