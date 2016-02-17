app.controller('GetUsersCtrl', function ($scope, $state, $mdDialog) {

  $scope.goto = function (state) {
    $state.go(state);
  };

  $scope.goToPerson = function(id, event) {
    for (var i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i].id == id) {
        var tempUser = $scope.users[i];
      }
    }
    $mdDialog.show({
      controller: DialogCtlr,
      templateUrl: 'templates/dialogs/detalleuser.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: false,
      locals: {
        user: tempUser
      }
    });
    function DialogCtlr($scope) {
      $scope.user = tempUser;
    }
  }

  $scope.removeUser = function (id) {
    io.socket.delete('/user/remove', {id: id}, function (data) {});
  };

  io.socket.get('/user', function (data) {
    console.log(data);
    $scope.users = data;
  });

  io.socket.on('user', function (data) {
    switch (data.verb) {
      case 'destroyed':
        console.log(data);
        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.users[i].id == data.id) {
            $scope.users.splice(i, 1);
            $scope.$apply();
          }
        }
        break;
      case 'created':
        console.log(data);
        $scope.users.push(data.data);
        $scope.$apply();
        break;
      default:
        return;

    }
  })
})
