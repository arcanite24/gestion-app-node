app.controller('SetMateriasCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }
  $scope.setMateria = function () {
    var tempClase = {
      nombre_materia: $scope.materiaid,
      dia: $scope.dia,
      hora_inicio: $scope.horainicio,
      hora_fin: $scope.horafin,
      horario: $scope.horarioid
    };
    io.socket.post('/clasehorario', tempClase, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Clase asignada correctamente.").hideDelay(2000));
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  $scope.dias = [
    {name: 'Lunes', value: 1},
    {name: 'Martes', value: 2},
    {name: 'Miércoles', value: 3},
    {name: 'Jueves', value: 4},
    {name: 'Viernes', value: 5}
  ];

  $scope.horas = [
    {value: '7:00'},
    {value: '8:00'},
    {value: '9:00'},
    {value: '10:00'},
    {value: '11:00'},
    {value: '12:00'},
    {value: '13:00'},
    {value: '14:00'},
    {value: '15:00'},
    {value: '16:00'},
    {value: '17:00'},
    {value: '18:00'},
    {value: '19:00'},
    {value: '20:00'},
    {value: '21:00'}
  ];

  io.socket.get('/clase', function(data) {
    $scope.materias = data;
  });
  io.socket.get('/horario', function(data) {
    $scope.horarios = data;
  });
});
