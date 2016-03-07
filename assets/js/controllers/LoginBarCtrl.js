app.controller('LoginBarCtrl', function ($scope, $window, $rootScope, $state, LoginService) {
  $scope.logged = LoginService.isLogged();
  $scope.online = false;

  $rootScope.$on('$stateChangeSuccess', function () {
    $scope.logged = LoginService.isLogged();
    $scope.user_type = localStorage.getItem('user_type');
    if (!$scope.logged) {
      $state.go('login');
    }
  });

  $scope.logout = function () {
    LoginService.logout();
  };

  $scope.go = function (state) {
    $state.go(state);
  };

  io.socket.on('connect', function(){
    io.socket.post('/online', {name: 'foo'}, function (data) {
      localStorage.setItem('idOnline', data.id);
    });
  });

  $window.onbeforeunload = function () {
    io.socket.delete('/online/'+localStorage.getItem('idOnline'), function (data) {
      localStorage.removeItem('idOnline');
    });
  };

  io.socket.on('disconnect', function(){
    io.socket.delete('/online/'+localStorage.getItem('idOnline'), function (data) {
      localStorage.removeItem('idOnline');
    });
  });
});
