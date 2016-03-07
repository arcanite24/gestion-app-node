app.controller('DelProfeCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.setGrupo = function () {
    io.socket.get('/grupo/'+$scope.grupoid, function(data) {
      $scope.grupoDetalle = data;
    });
  }

  $scope.removeProfe = function (idProfe) {
    io.socket.get('/user/'+idProfe, function(data) {
      var tempProfe = data;
      tempProfe.grupoAsProfe = null;
      io.socket.put('/user/'+idProfe, tempProfe, function(d) {
        if (!d.error) {
          for (var i = 0; i < $scope.grupoDetalle.profesores.length; i++) {
            if ($scope.grupoDetalle.profesores[i].id == d.id) {
              $scope.grupoDetalle.profesores.splice(i, 1);
              $mdToast.show($mdToast.simple().textContent("Profesor removido del grupo.").hideDelay(2000));
            }
          }
        } else {
          $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
        }
      });
    });
  }

  $scope.removeAlumno = function (idAlumno) {
    io.socket.get('/user/'+idAlumno, function(data) {
      var tempAlumno = data;
      tempAlumno.grupo = null;
      io.socket.put('/user/'+idAlumno, tempAlumno, function(d) {
        if (!d.error) {
          for (var i = 0; i < $scope.grupoDetalle.users.length; i++) {
            if ($scope.grupoDetalle.users[i].id == d.id) {
              $scope.grupoDetalle.users.splice(i, 1);
              $mdToast.show($mdToast.simple().textContent("Alumno removido del grupo.").hideDelay(2000));
            }
          }
        } else {
          $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
        }
      });
    });
  }

  io.socket.get('/grupo', function(data) {
    $scope.grupos = data;
  });
});
