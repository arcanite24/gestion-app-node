app.controller('ExamenesCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

    
});
