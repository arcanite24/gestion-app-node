app.controller('AddClaseCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.semestres = [
    {value: 1, nombre: 'Primer Semestre'},
    {value: 2, nombre: 'Segundo Semestre'},
    {value: 3, nombre: 'Tercer Semestre'},
    {value: 4, nombre: 'Cuarto Semestre'},
    {value: 5, nombre: 'Quinto Semestre'},
    {value: 6, nombre: 'Sexto Semestre'}
  ];

  $scope.addClase = function () {
    var tempClase = {
      nombre: $scope.addclase.nombre,
      semestre: $scope.addclase.semestre
    };
    io.socket.post('/clase', tempClase, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Clase agregada correctamente.").hideDelay(2000));
      } else {
        console.log(data);
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
      $scope.addclase.nombre = null;
    });
  }
});
