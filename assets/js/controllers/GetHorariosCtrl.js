app.controller('GetHorariosCtrl', function($scope, $state, $mdToast, $mdDialog) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeHorario = function (id) {
    io.socket.delete('/horario/'+id, function(data) {
      if (!data.error) {
        for (var i = 0; i < $scope.horarios.length; i++) {
          if ($scope.horarios[i].id == data.id) {
            $scope.horarios.splice(i, 1);
            $mdToast.show($mdToast.simple().textContent("Horario eliminado.").hideDelay(2000));
            return;
          }
        }
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  $scope.showHorario = function (id, event) {
    for (var i = 0; i < $scope.horarios.length; i++) {
      if ($scope.horarios[i].id == id) {
        var tempHorario = $scope.horarios[i];
      }
    }
    $mdDialog.show({
      controller: DialogCtlr,
      templateUrl: 'templates/dialogs/detallehorario.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: false,
      locals: {
        user: tempHorario
      }
    });
    function DialogCtlr($scope) {
      $scope.horario = tempHorario;
    }
  }

  io.socket.get('/horario', function(data) {
    $scope.horarios = data;
  });
});
