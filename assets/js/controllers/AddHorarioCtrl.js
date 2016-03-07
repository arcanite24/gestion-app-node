app.controller('AddHorarioCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/grupo', function(data) {
    $scope.grupos = data;
  });

  $scope.addHorario = function () {
    var tempHorario = {
      nombre: $scope.addhorario.name,
      grupo_horario: $scope.grupoid
    }
    io.socket.post('/horario', tempHorario, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Horario registrado correctamente.").hideDelay(2000));
        $scope.addhorario.name = null;
      } else {

        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }
});
