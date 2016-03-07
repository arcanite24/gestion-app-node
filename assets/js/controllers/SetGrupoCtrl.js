app.controller('SetGrupoCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.setGrupo = function () {
    var userId = $scope.userid;
    var grupoId = $scope.grupoid;
    io.socket.get('/user/'+userId, function (data) {
      var tempUser = data;
      tempUser.grupo = grupoId;
      io.socket.put('/user/'+userId, tempUser, function (d) {
        if (!d.error) {
          $scope.userid = null;
          $scope.grupoid = null;
          $mdToast.show($mdToast.simple().textContent("Grupo asignado correctamente.").hideDelay(2000));
        } else {
          $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
        }
      });
    });
  }

  io.socket.get('/grupo', function (data) {
    $scope.grupos = data;
  });
  io.socket.get('/user', function (data) {
    $scope.users = data;
  });
});
