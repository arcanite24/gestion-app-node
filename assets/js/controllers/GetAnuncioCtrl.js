app.controller('GetAnuncioCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/anuncio', function(data) {
    $scope.anuncios = data;
  });

  $scope.removeAnuncio = function (id) {
    io.socket.delete('/anuncio/'+id, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Anuncio borrado correctamente.").hideDelay(2000));
        for (var i = 0; i < $scope.anuncios.length; i++) {
          if ($scope.anuncios[i].id == data.id) {
            $scope.anuncios.splice(i, 1);
            return;
          }
        }
      }
    });
  };

  io.socket.on('anuncio', function (msg) {
    switch (msg.verb) {
      case 'created':
        $scope.anuncios.push(msg.data);
        $scope.$apply();
        break;
      case 'destroyed':
        for (var i = 0; i < $scope.anuncios.length; i++) {
          if ($scope.anuncios[i].id == msg.previous.id) {
            $scope.anuncios.splice(i, 1);
            $scope.$apply();
            return;
          }
        }
        break;
      default:

    }
  });
});
