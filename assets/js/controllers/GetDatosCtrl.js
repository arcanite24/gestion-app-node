app.controller('GetDatosCtrl', function ($scope, $state, $mdToast) {

  $scope.goto = function (state) {
    $state.go(state);
  };

  $scope.foo = function () {
    io.socket.get('/user/'+$scope.userid, function (data) {
      console.log(data);
      $scope.datos = data.datos;
    });
  }

  $scope.removeDato = function (id) {
    io.socket.delete('/dato/'+id, function (data) {
      console.log(data);
      if (!data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Dato eliminado.')
          .hideDelay(2000));
        for (var i = 0; i < $scope.datos.length; i++) {
          if ($scope.datos[i].id == data.id) {
            $scope.datos.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  io.socket.get('/user', function (data) {
    $scope.users = data;
  });
});
