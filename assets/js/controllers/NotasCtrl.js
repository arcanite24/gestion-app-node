app.controller('NotasCtrl', function($scope, $state, $mdToast) {
  $scope.goto = function (state) {
    $state.go(state);
  }

  $scope.gridsterOpts = {
    defaultSizeX: 1
  };

  $scope.removeNota = function (id) {
    io.socket.delete('/nota/'+id, function(data) {
      if (!data.error) {
        for (var i = 0; i < $scope.notas.length; i++) {
          if ($scope.notas[i].id == data.id) {
            $scope.notas.splice(i, 1);
          }
        }
        $mdToast.show($mdToast.simple().textContent("Nota eliminada.").hideDelay(2000));
      } else {
        $mdToast.show($mdToast.simple().textContent("Error").hideDelay(2000));
      }
    });
  };

  $scope.add = function () {
    var notaTemp = {
      titulo: $scope.titulo,
      texto: $scope.texto,
      user: localStorage.getItem('iduser')
    };
    var xy = Math.random() < 0.5;
    var largo = notaTemp.texto.length / 100;
    if (largo < 1)
      largo = 1;
    if (xy) {
      notaTemp.sizeX = Math.floor(largo);
      notaTemp.sizeY = 1;
    } else {
      notaTemp.sizeX = 1;
      notaTemp.sizeY = Math.floor(largo);
    }
    io.socket.post('/nota', notaTemp, function(data) {
      if (!data.error) {
        $mdToast.show($mdToast.simple().textContent("Nota agregada correctamente.").hideDelay(2000));
        $scope.titulo = null;
        $scope.texto = null;
        $scope.notas.push(data);
      } else {
        $mdToast.show($mdToast.simple().textContent("Error.").hideDelay(2000));
        console.log(data);
      }
    });
  }

  io.socket.get('/user/'+localStorage.getItem('iduser'), function(data) {
    $scope.notas = data.notas;
  });


});
