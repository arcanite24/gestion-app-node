app.controller('GetExamenCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeExamen = function (id) {
    io.socket.delete('/examen/'+id, function(data) {
      if (!data.error) {
        for (var i = 0; i < $scope.examenes.length; i++) {
          if ($scope.examenes[i].id == data.id) {
            $scope.examenes.splice(i, 1);
            $mdToast.show($mdToast.simple().textContent("Exámen removido correctamente.").hideDelay(2000));
            return;
          }
        }
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  io.socket.get('/examen', function(data) {
    $scope.examenes = data;
  });
});
