app.controller('WeaCtrl', function ($scope, $state, LoginService) {
  if (!LoginService.isLogged()) {
    $state.go('login');
  }
});
