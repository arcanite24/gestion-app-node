app.controller('LoginCtrl', function ($scope, $state, $mdToast, LoginService) {

  $scope.login = function () {
    LoginService.login($scope.login.username, $scope.login.password);
  };

  $scope.logout = function () {
    LoginService.logout();
    $mdToast.show(
      $mdToast.simple()
      .textContent('Sesión cerrada correctamente.')
      .hideDelay(1000));
    $state.go('index');
  };

  $scope.isLogged = LoginService.isLogged();
});
