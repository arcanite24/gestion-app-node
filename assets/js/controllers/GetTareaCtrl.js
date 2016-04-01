app.controller('GetTareaCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/tarea', function(data) {
    $scope.tareas = data;
  });

  $scope.removeTarea = function (id) {
    io.socket.delete('/tarea/'+id, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Tarea borrada correctamente.").hideDelay(2000));
        for (var i = 0; i < $scope.tareas.length; i++) {
          if ($scope.tareas[i].id == data.id) {
            $scope.tareas.splice(i, 1);
            return;
          }
        }
      }
    });
  };

  io.socket.on('tarea', function (msg) {
    switch (msg.verb) {
      case 'created':
        $scope.tareas.push(msg.data);
        $scope.$apply();
        break;
      case 'destroyed':
        for (var i = 0; i < $scope.tareas.length; i++) {
          if ($scope.tareas[i].id == msg.id) {
            $scope.tareas.splice(i, 1);
            $scope.$apply();
            return;
          }
        }
        break;
      default:
        return;
    }
  });
});
