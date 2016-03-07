app.controller('AddGruposCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.addGrupo = function () {
    var tempGrupo = {
      nombre: $scope.addgrupo.name
    };
    io.socket.post('/grupo', tempGrupo, function (data) {
      if (!data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Grupo ' + tempGrupo.nombre + ' agregado correctamente.')
          .hideDelay(2000));
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Error al agregar grupo, verifica la validez de los datos.')
          .hideDelay(2000));
      }
      $scope.addgrupo.name = null;
    });
  }
});
