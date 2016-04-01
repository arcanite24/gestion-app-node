app.controller('AddTareaCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  io.socket.get('/tarea', function(data) {
    $scope.tareas = data;
  });

  io.socket.get('/grupo', function(data) {
    $scope.grupos = data;
  });

  $scope.addTarea = function () {
    var tempTarea = {
      titulo: $scope.tarea.titulo,
      texto: $scope.tarea.texto,
      entrega: $scope.tarea.fecha,
      grupo: $scope.tarea.grupo
    };
    io.socket.post('/tarea', tempTarea, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Tarea agregada correctamente.").hideDelay(2000));
        $scope.tarea = null;
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }
});
