module.exports = {

  suscribe: function (req, res) {
    var roomName = req.param('roomName');
    sails.sockets.join(req.socket, roomName);
    res.json({
      message: 'Suscrito al socket: ' + roomName
    });
  }

}
