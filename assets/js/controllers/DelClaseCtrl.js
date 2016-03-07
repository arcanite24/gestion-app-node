app.controller('DelClaseCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeClase = function (id) {
    io.socket.delete('/clasehorario/'+id, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Clase eliminada correctamente.").hideDelay(2000));
        for (var i = 0; i < $scope.horarioSeleccionado.materias.length; i++) {
          if ($scope.horarioSeleccionado.materias[i].id == data.id) {
            $scope.horarioSeleccionado.materias.splice(i, 1);
          }
        }
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  $scope.setHorario = function () {
    io.socket.get('/horario/'+$scope.horarioid, function(data) {
      $scope.horarioSeleccionado = data;
    });
  }

  io.socket.get('/horario', function(data) {
    $scope.horarios = data;
  });
});
