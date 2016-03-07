app.controller('AddAdminCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.addAdmin = function () {
    if (!localStorage.getItem('token')) {
      $state.go('login');
      return;
    }

    var admin = {
      username: $scope.addadmin.username,
      password: CryptoJS.SHA512($scope.addadmin.password).toString(),
      address: $scope.addadmin.address,
      bornDate: $scope.addadmin.borndate,
      type: 1,
      name: $scope.addadmin.name
    };

    io.socket.request({
      method: 'post',
      url: '/user/create',
      params: admin
    }, function (data) {
      console.log(data);
      if (data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Error, verifica la validez de los datos.')
          .hideDelay(2000));
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Administrador ' + $scope.addadmin.name + ' agregado.')
          .hideDelay(2000));
        $scope.addadmin.username = null;
        $scope.addadmin.name = null;
        $scope.addadmin.borndate = null;
        $scope.addadmin.address = null;
        $scope.addadmin.password = null;
      }
    });
  }
});
