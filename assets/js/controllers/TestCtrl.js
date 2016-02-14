app.controller('TestCtrl', function ($scope, $http) {
  io.socket.get('/user/', function (data) {
    $scope.weas = data;
    $scope.$apply();
  });
  io.socket.get('/online/', function (data) {
    $scope.onlines = data;
    $scope.$apply();
  });
  io.socket.on('user', function onUserSocket(msg) {
    switch (msg.verb) {
      case 'created':
        $scope.weas.push(msg.data);
        $scope.$apply();
        break;
      default:
        return;
    }
  });
  io.socket.on('online', function onUserSocket(msg) {
    switch (msg.verb) {
      case 'created':
        $scope.onlines.push(msg.data);
        $scope.$apply();
        break;
      case 'destroyed':
        for (var i = 0; i < $scope.onlines.length; i++) {
          if ($scope.onlines[i].id == msg.id) {
            $scope.onlines.splice(i, 1);
            $scope.$apply();
          }
        }
        break;
      default:
        return;
    }
  });

  $scope.register = function () {
    io.socket.post('/user/create', {username: $scope.username, password: $scope.password}, function (data) {
    });
  };
});
