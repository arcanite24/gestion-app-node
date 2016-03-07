app.controller('HorariosCtrl', function($state, $scope) {
  $scope.goto = function (state) {
    $state.go(state);
  }
});
