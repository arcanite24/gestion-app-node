app.controller('WatchAnuncioCtrl', function($scope, $state, $mdToast, fgDelegate) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/anuncio', function(data) {
    $scope.anuncios = data;
  });

  io.socket.on('anuncio', function (msg) {
    switch (msg.verb) {
      case 'created':
        $scope.anuncios.push(msg.data);
        $scope.$apply();
        break;
      case 'destroyed':
      console.log(msg);
        for (var i = 0; i < $scope.anuncios.length; i++) {
          if ($scope.anuncios[i].id == msg.id) {
            $scope.anuncios.splice(i, 1);
            $scope.$apply();
          }
        }
        break;
      default:
        return;
    }
  });
});
