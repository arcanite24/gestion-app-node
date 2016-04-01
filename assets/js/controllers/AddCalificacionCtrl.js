app.controller('AddCalificacionCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.values = [
    {valor: 1},
    {valor: 2},
    {valor: 3},
    {valor: 4},
    {valor: 5},
    {valor: 6},
    {valor: 7},
    {valor: 8},
    {valor: 9},
    {valor: 10}
  ];

  $scope.addCali = function () {
    io.socket.post('/calificacion', $scope.cali, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Calificación registrada correctamente.").hideDelay(2000));
        $scope.cali = null;
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
      }
    });
  }

  io.socket.get('/user', function(data) {
    $scope.alumnos = data;
  });

  io.socket.get('/clase', function(data) {
    $scope.materias = data;
  });
});
