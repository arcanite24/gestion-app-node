module.exports = {
  join: function (req, res) {
    Online.create(req.allParams()).exec(function (err, online) {
      if(err)
        console.log(err);
      Online.publishCreate(online);
      res.json(online);
    });
  },
  leave: function (req, res) {
    Online.destroy({id: req.param('id')}).exec(function (err) {
      if(err)
        console.log(err);
      console.log('Online termina sesion: ' + req.param('id'));
      Online.publishDestroy({id: req.param('id')});
    });
  }
};
