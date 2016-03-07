app.controller('GruposCtrl', function ($scope, $state) {
  $scope.goto = function (state) {
    $state.go(state);
  };
});
