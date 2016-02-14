/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addConv: function (req, res) {
		var user = req.param('user');
		var message = req.param('message');

		if(req.isSocket && req.method === 'POST'){
			Chat.create({user: user, message: message})
				.exec(function(error,created){
					if (error) {
						console.log(error);
						return;
					}
					console.log(created);
					Chat.publishCreate({id: created.id, message : created.message , user:created.user});
				});
		}
		else if(req.isSocket){
			Chat.watch(req.socket);
			console.log( 'User subscribed to ' + req.socket.id );
		}
	}

};
