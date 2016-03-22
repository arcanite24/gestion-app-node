/**
 * ChatMsgController
 *
 * @description :: Server-side logic for managing Chatmsgs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	post: function (req, res) {
		if (req.isSocket && req.method === 'POST') {
			var tempMsg = req.allParams();
			ChatMsg.create(tempMsg).exec(function (err, msg) {
				if (err) {
					console.log(err);
					res.json({error: true, message: 'Error.'});
				} else {
					ChatMsg.publishCreate(msg);
					return res.ok();
				}
			});
		}
	}
};
