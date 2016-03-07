app.controller('GetGruposCtrl', function($scope, $state, $mdToast, $mdDialog) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeGrupo = function (id) {
    io.socket.delete('/grupo/'+id, function(data) {
      for (var i = 0; i < $scope.grupos.length; i++) {
        if ($scope.grupos[i].id == data.id) {
          $scope.grupos.splice(i, 1);
          $mdToast.show($mdToast.simple().textContent("Grupo eliminado.").hideDelay(2000));
          return;
        }
      }
    });
  }

  $scope.goToGrupo = function(id, event) {
    for (var i = 0; i < $scope.grupos.length; i++) {
      if ($scope.grupos[i].id == id) {
        var tempGrupo = $scope.grupos[i];
      }
    }
    $mdDialog.show({
      controller: DialogCtlr,
      templateUrl: 'templates/dialogs/detallegrupo.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: false,
      locals: {
        grupo: tempGrupo
      }
    });
    function DialogCtlr($scope) {
      $scope.grupo = tempGrupo;
    }
  }


  io.socket.get('/grupo', function(data) {
    $scope.grupos = data;
  });
});
