app.controller('GetCalificacionCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeCali = function (id) {
    io.socket.delete('/calificacion/'+id, function(data) {
      if (!data.error) {
        for (var i = 0; i < $scope.calis.length; i++) {
          if ($scope.calis[i].id == data.id) {
            $scope.calis.splice(i, 1);
            return;
          }
        }
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  io.socket.get('/calificacion', function(data) {
    $scope.calis = data;
  });
});
