app.controller('AddExamenCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

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

  $scope.addExamen = function () {
    var tempExamen = {
      fecha: $scope.fecha,
      materia: $scope.materiaid,
      hora: $scope.inicio + ' - ' + $scope.fin
    };

    if ($scope.inicio == $scope.fin) {
      $mdToast.show($mdToast.simple().textContent("Las horas no pueden ser iguales.").hideDelay(2000));
      return;
    }

    io.socket.post('/examen', tempExamen, function(data) {
      if (!data.error) {
        $scope.inicio = null;
        $scope.fin = null;
        $scope.fecha = null,
        $scope.materiaid = null;

        $mdToast.show($mdToast.simple().textContent("Exámen registrado correctamente.").hideDelay(2000));
      } else {
        console.log(data);
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }
});
