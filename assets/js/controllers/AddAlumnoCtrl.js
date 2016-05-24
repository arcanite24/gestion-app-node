app.controller('AddAlumnoCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.addAlumno = function () {
    if (!localStorage.getItem('token')) {
      $state.go('login');
      return;
    }

    var alumno = {
      username: $scope.addalumno.username,
      password: CryptoJS.SHA512($scope.addalumno.username.substr(0, 4)).toString(),
      address: $scope.addalumno.address,
      bornDate: $scope.addalumno.borndate,
      type: 2,
      name: $scope.addalumno.name
    };

    io.socket.request({
      method: 'post',
      url: '/user/create',
      params: alumno
    }, function (data) {
      if (data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Error, verifica la validez de los datos.')
          .hideDelay(2000));
      } else {
        console.log(data);
        var iduser = data.user.id;
        io.socket.request({
          method: 'post',
          url: '/dato',
          params: {
            user: iduser,
            name: 'Sexo',
            value: $scope.addalumno.sexo
          }
        });
        io.socket.request({
          method: 'post',
          url: '/dato',
          params: {
            user: iduser,
            name: 'Boleta',
            value: $scope.addalumno.boleta
          }
        });

        $mdToast.show(
          $mdToast.simple()
          .textContent('Alumno ' + $scope.addalumno.name + ' agregado. La contraseña son los cuatro primeros dígitos del nombre de usuario.')
          .hideDelay(4000));
        $scope.addalumno = null;
      }
    });
  }
})
