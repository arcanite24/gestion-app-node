app.controller('CalendarioExamenesCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/examen', function(data) {
    $scope.examenes = data;
  });
});
