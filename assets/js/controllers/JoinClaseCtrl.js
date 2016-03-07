app.controller('JoinClaseCtrl', function($scope, $state, $mdToast, $window) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.watchClase = function (room) {
    $mdToast.show($mdToast.simple().textContent("Uniendose a clase...").hideDelay(2000));
    $window.location.href = 'watch?room='+room;
  }

  io.socket.get('/claseonline', function(data) {
    $scope.clases = data;
  });
});
