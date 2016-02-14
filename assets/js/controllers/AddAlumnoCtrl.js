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
      password: CryptoJS.SHA512(CryptoJS.MD5($scope.addalumno.username)).toString(),
      address: $scope.addalumno.address,
      bornDate: $scope.addalumno.borndate,
      type: 2,
      name: $scope.addalumno.name
    };

    io.socket.request({
      method: 'post',
      url: '/auth/register',
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
            name: 'sexo',
            value: $scope.addalumno.sexo
          }
        });
        io.socket.request({
          method: 'post',
          url: '/dato',
          params: {
            user: iduser,
            name: 'boleta',
            value: $scope.addalumno.boleta
          }
        });

        $mdToast.show(
          $mdToast.simple()
          .textContent('Profesor ' + $scope.addalumno.name + ' agregado.')
          .hideDelay(2000));
        $scope.addalumno.username = null;
        $scope.addalumno.name = null;
        $scope.addalumno.borndate = null;
        $scope.addalumno.address = null;
      }
    });
  }
})
