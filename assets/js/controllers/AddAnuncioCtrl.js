app.controller('AddAnuncioCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.addAnuncio = function () {
    var tempAnuncio = {
      titulo: $scope.anuncio.titulo,
      texto: $scope.anuncio.texto
    };
    io.socket.post('/anuncio', tempAnuncio, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Anuncio agregado correctamente.").hideDelay(2000));
        $scope.anuncio = null;
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }
});
