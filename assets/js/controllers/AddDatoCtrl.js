app.controller('AddDatoCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  };

  $scope.addDato = function () {
    var id = $scope.userid;
    var datoTemp = {
      user: id,
      name: $scope.adddato.name,
      value: $scope.adddato.value
    };
    io.socket.post('/dato', datoTemp, function (data) {
      if (!data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Dato agregado correctamente.')
          .hideDelay(2000));
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Error, verifica la validez de los datos.')
          .hideDelay(2000));
      }
      $scope.adddato.name = null;
      $scope.adddato.value = null;
    });
  }

  io.socket.get('/user', function (data) {
    $scope.users = data;
  });
});
