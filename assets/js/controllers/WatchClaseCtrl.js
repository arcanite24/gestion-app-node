app.controller('WatchClaseCtrl', function($rootScope, $scope, $state, $stateParams, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  if (!$stateParams.room) {
    $mdToast.show($mdToast.simple().textContent("Clase no especificada...").hideDelay(2000));
    $state.go('index');
  }

});
