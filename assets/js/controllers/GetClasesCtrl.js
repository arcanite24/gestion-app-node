app.controller('GetClasesCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeClase = function (id) {
    io.socket.delete('/clase/'+id, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Clase eliminada correctamente.").hideDelay(2000));
        for (var i = 0; i < $scope.clases.length; i++) {
          if (data.id == $scope.clases[i].id) {
            $scope.clases.splice(i, 1);
            return;
          }
        }
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  io.socket.get('/clase', function(data) {
    $scope.clases = data;
  });
});
