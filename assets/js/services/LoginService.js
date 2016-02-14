app.factory('LoginService', function ($mdToast, $state) {
  return {
    login: function (username, password) {
      io.socket.request({
        method: 'post',
        url: '/auth/login',
        params: {
          username: username,
          password: password
        }
      }, function (res) {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user_type', res.user.type);
          console.log(res.user);
          $mdToast.show(
            $mdToast.simple()
            .textContent('Sesión iniciada correctamente.')
            .hideDelay(1000));
            $state.go('index');
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Dato incorrectos.')
            .hideDelay(1000));
            $state.go('login');
        }
      });
    },
    logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('user_type');
    },
    isLogged: function () {
      return localStorage.getItem('token');
    }
  };
});
