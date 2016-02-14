app.controller('ChatCtrl', ['$http', '$scope', '$log', function ($http, $scope, $log) {

  $scope.predicate = '-id';
  $scope.reverse = false;

  $scope.sendMsg = function () {
		io.socket.post('/chat/addconv/',{user:$scope.username,message: $scope.message});
		$scope.chatMessage = "";
  };

  io.socket.get('/chat/addconv');

  $http.get('/chat').success(function (data) {
    $scope.chatList = data;
    $log.info(data);
  });

  io.socket.on('chat', function (obj) {
    switch (obj.verb) {
      case 'created':
        $log.info(obj);
        $scope.chatList.push(obj.data);
        $scope.$apply();
        break;
      default:
        console.log(obj);
        return;
    }
  });

}]);
