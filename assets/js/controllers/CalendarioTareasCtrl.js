app.controller('CalendarioTareasCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/tarea', function(data) {
    var tareas = data;
    var iduser = localStorage.getItem('iduser');
    io.socket.get('/user/'+iduser, function(data) {
      if (!data.error) {
        $scope.tareas = [];
        var grupoid = data.grupo.id;
        for (var i = 0; i < tareas.length; i++) {
          if (tareas[i].grupo.id == data.grupo.id) {
            $scope.tareas.push(tareas[i]);
          }
        }
      }
    });
  });

  io.socket.on('tarea', function (msg) {
    switch (msg.verb) {
      case 'created':
        io.socket.get('/user/'+localStorage.getItem('iduser'), function(data) {
          var grupo_id = data.grupo.id;
          if (msg.data.grupo == grupo_id) {
            $scope.tareas.push(msg.data);
            $scope.$apply();
          }
        });
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
