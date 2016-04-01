app.controller('ClasesCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.removeClase = function (id) {
    io.socket.delete('/claseonline/'+id, function(data) {
      if (!data.error) {
        for (var i = 0; i < $scope.clases.length; i++) {
          if ($scope.clases[i].id == id) {
            $scope.clases.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  io.socket.get('/claseonline', function(data) {
    $scope.clases = data;
  });
});
