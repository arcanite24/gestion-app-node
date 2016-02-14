app.controller('AddTeacherCtrl', function ($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.addTeacher = function () {
    if (!localStorage.getItem('token')) {
      $state.go('login');
      return;
    }

    var teacher = {
      username: $scope.addteacher.username,
      password: CryptoJS.SHA512(CryptoJS.MD5($scope.addteacher.username)).toString(),
      address: $scope.addteacher.address,
      bornDate: $scope.addteacher.borndate,
      type: 3,
      name: $scope.addteacher.name
    };

    io.socket.request({
      method: 'post',
      url: '/auth/register',
      params: teacher
    }, function (data) {
      if (data.error) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Error, verifica la validez de los datos.')
          .hideDelay(2000));
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Profesor ' + $scope.addteacher.name + ' agregado.')
          .hideDelay(2000));
        $scope.addteacher.username = null;
        $scope.addteacher.name = null;
        $scope.addteacher.borndate = null;
        $scope.addteacher.address = null;
      }
    });
  }
});
