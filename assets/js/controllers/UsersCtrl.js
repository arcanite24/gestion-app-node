app.controller('UsersCtrl', function ($scope, $state) {
  $scope.goto = function (state) {
    $state.go(state);
  };
});
