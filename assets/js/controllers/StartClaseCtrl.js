app.controller('StartClaseCtrl', function($scope, $state, $mdToast, $window) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.startClase = function () {
    var roomStr = $scope.startclase.nombre.replace(/\s+/g, '');
    var tempClase = {
      nombre: $scope.startclase.nombre,
      room: roomStr
    };
    io.socket.post('/claseonline', tempClase, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Clase agregada. Iniciando...").hideDelay(2000));
        $window.location.href = 'watch?room='+roomStr;
      } else {
        $mdToast.show($mdToast.simple().textContent("Error. Verifica que no exista una clase con el mismo nombre.").hideDelay(2000));
      }
    });
  }
});
